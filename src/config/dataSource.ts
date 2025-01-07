import { DataSource } from "typeorm";
import { RedisCache } from "./redisCache";
import dotenv from "dotenv";
dotenv.config();
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
  host: process.env.MYSQLHOST || "localhost",
  port: Number(process.env.MYSQLPORT) || 3306,
  username: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "food_suggestion",
  synchronize: false,
  logging: true,
  entities: ["src/entitys/*.ts"],
  migrations: [
    // Dẫn đến thư mục migrations của bạn
    "src/migrations/*.ts",
  ],
  subscribers: [],
});
