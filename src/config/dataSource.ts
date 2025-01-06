
import { DataSource } from "typeorm";
import { RedisCache } from "./redisCache";
const redisConfig = {
  host: 'localhost',  // Địa chỉ Redis server
  port: Number(process.env.PORT_REDIS)||6379,         // Cổng mặc định của Redis
  db: 0,              // Sử dụng DB 0 trong Redis
  retryStrategy: (times) => {
    // Nếu Redis mất kết nối, thử kết nối lại sau 1 giây
    return Math.min(times * 50, 2000);
  },
};
export const redisCache = new RedisCache(redisConfig);
// Cấu hình kết nối sử dụng DataSource
export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  database: process.env.DATABASE||'food_suggestion',
  synchronize: false,
  logging: true,
  entities: ["src/entitys/*.ts"],
  migrations: [
    // Dẫn đến thư mục migrations của bạn
    "src/migrations/*.ts"
  ],
  subscribers:[],
  cache: {
    type: "redis",       // Sử dụng Redis làm cache
    duration: 10000,     // Thời gian sống của cache (tính bằng milisecond)
    options: {
      client: redisCache,  // Kết nối Redis client
    },
  },

  
});

