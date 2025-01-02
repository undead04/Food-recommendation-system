
import { useExpressServer } from 'routing-controllers';
import express from "express";
import dataSource from "./dataSource";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import "reflect-metadata";
import {CustomErrorHandler} from 'Middlewares/ErrorHandle';
// Tạo server Express
const app = express()
app.use(bodyParser.json())
app.use(express.json())
// set up cookies
app.use(cookieParser());
dotenv.config();
useExpressServer(app,{
    controllers: [__dirname+'/controllers/*.ts'],
    defaultErrorHandler:false,
    middlewares:[CustomErrorHandler],
})
// Khởi tạo kết nối đến cơ sở dữ liệu
dataSource.initialize()
  .then(() => {
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
  })
  .catch((error) => {
    console.error("Lỗi khi kết nối đến cơ sở dữ liệu:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
