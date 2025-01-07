import path from "path";
import { dataSource } from "./dataSource";
import fs from "fs";

const seedDatabase = async () => {
  await dataSource.initialize();
  const start = Date.now();
  const end = Date.now();
  console.log(`Thời gian thêm dữ liệu vào sql ${(end - start) / 1000}`);
  console.log("Data seeded!");
  await dataSource.destroy();
};

//seedDatabase().catch((error) => console.error(error));
