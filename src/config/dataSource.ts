import { DataSource } from "typeorm";
import { RedisCache } from "./redisCache";
const redisConfig = {
  host: process.env.HOST_REDIS || "localhost", // Địa chỉ Redis server
  port: Number(process.env.PORT_REDIS) || 6379, // Cổng mặc định của Redis
  password: process.env.REDIS_PASSWORD || "",
  db: 0, // Sử dụng DB 0 trong Redis
  retryStrategy: (times) => {
    // Nếu Redis mất kết nối, thử kết nối lại sau 1 giây
    return Math.min(times * 50, 2000);
  },
};
export const redisCache = new RedisCache(redisConfig);
// Cấu hình kết nối sử dụng DataSource
export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.MY_HOST || "localhost",
  port: Number(process.env.PORT_MYSQL) || 3306,
  username: process.env.USERSQL || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE || "food_suggestion",
  synchronize: false,
  logging: true,
  entities: ["src/entitys/*.ts"],
  migrations: [
    // Dẫn đến thư mục migrations của bạn
    "src/migrations/*.ts",
  ],
  subscribers: [],
  cache: {
    type: "redis", // Sử dụng Redis làm cache
    duration: 10000, // Thời gian sống của cache (tính bằng milisecond)
    options: {
      client: redisCache, // Kết nối Redis client
    },
  },
});
