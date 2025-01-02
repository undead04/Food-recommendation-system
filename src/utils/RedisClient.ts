import Redis from "ioredis";

const redis = new Redis({
  host: "localhost", 
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    return Math.min(times * 100, 2000); // Thử kết nối lại với khoảng thời gian tăng dần, tối đa 2 giây
  }, 
});

export default redis;
