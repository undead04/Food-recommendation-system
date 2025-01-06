// redisCache.ts

import Redis, { RedisOptions } from "ioredis";
import { promisify } from "util";

export class RedisCache {
  private client: Redis
  private scanAsync
  private delAsync  
  constructor(redisConfig: RedisOptions) {
    this.client = new Redis(redisConfig);
    this.scanAsync = promisify(this.client.scan).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  // Phương thức lấy client Redis
  public getClient(): Redis {
    return this.client;
  }

  // Phương thức để lưu trữ dữ liệu vào Redis
  public async set(key: string, value: any, ttl: number = 1000*60*10): Promise<void> {
    await this.client.setex(key, ttl, JSON.stringify(value));
  }

  // Phương thức để lấy dữ liệu từ Redis
  public async get(key: string): Promise<any | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  // Phương thức để xóa dữ liệu khỏi Redis
  public async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  // Phương thức kiểm tra kết nối Redis
  public async ping(): Promise<string> {
    return await this.client.ping();
  }
  // Hàm xóa cache theo mẫu
  public async clearCacheByPattern (pattern: string) {
    let cursor = '0';
    do {
      // SCAN để tìm các key theo pattern
      const [newCursor, keys] = await this.scanAsync(cursor, 'MATCH', pattern, 'COUNT', '100');
      cursor = newCursor;
      if (keys.length > 0) {
        // Xóa tất cả các key tìm được
        await Promise.all(keys.map((key) => this.delAsync(key)));
      }
    } while (cursor !== '0'); // Lặp lại cho đến khi cursor = '0'
  };
  // Đóng kết nối Redis
  public close(): void {
    this.client.quit();
  }
}
