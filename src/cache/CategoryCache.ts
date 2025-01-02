import redis from "../utils/RedisClient";
const CATEGORY_CACHE_KEY = "categories_cache";

export class CategoryCache {
  static async getCategories(): Promise<any | null> {
    const cache = await redis.get(CATEGORY_CACHE_KEY);
    return cache ? JSON.parse(cache) : null;
  }

  static async setCategories(data: any): Promise<void> {
    await redis.set(CATEGORY_CACHE_KEY, JSON.stringify(data), "EX", 3600); // TTL 1 giờ
  }

  static async clearCache(): Promise<void> {
    await redis.del(CATEGORY_CACHE_KEY);
  }
}
