import "reflect-metadata";
import express from "express";
import dataSource from "./dataSource";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from "./Middlewares/ErrorHandle";
import categoryRoute from './routes/CategoryRoute'
import authRoute from './routes/AuthRoute'
import ingredientRoute from './routes/IngredientRoute'
import recipeRoute from './routes/RecipeRoute'
import userRoute from './routes/UserRoute'
import favouriteRoute from './routes/FavouriteRoute'
const app = express();
app.use(express.json());
// set up cookies
app.use(cookieParser())
// Sử dụng body-parser để xử lý dữ liệu JSON
app.use(bodyParser.json());
dotenv.config();
// Khởi tạo kết nối đến cơ sở dữ liệu
dataSource.initialize()
  .then(() => {
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
  })
  .catch((error) => {
    console.error("Lỗi khi kết nối đến cơ sở dữ liệu:", error);
  });
app.use('/api/category',categoryRoute)
app.use('/api',authRoute)
app.use('/api/ingredient',ingredientRoute)
app.use('/api/recipe',recipeRoute)
app.use('/api/user',userRoute)
app.use(`/api/favourite`,favouriteRoute)
app.use(errorHandler)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});