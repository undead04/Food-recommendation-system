import { Request,Response } from "express";
import UserService from "../services/UserService";
import { LoginModel } from "../models/modelRequest/UserModel";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { Body, Get, JsonController, Post, Req, Res, UseBefore } from "routing-controllers";
import jwt from 'jsonwebtoken';
import validateError from "../Middlewares/ValidateErrorDTO";

@JsonController('')
export default class AuthController{
  userService:UserService
  constructor(){
    this.userService = new UserService()
  }
  @Post('/login')
  @UseBefore(validateError(LoginModel))
  async login(@Body() model:LoginModel,@Res() res: Response){
    try {
      // Kiểm tra thông tin người dùng đăng nhập
      const userData = await this.userService.isLogin(model);
      // Nếu thông tin đăng nhập không đúng
      if (userData == null) {
        return res.status(400).json(RepositoryDTO.Error(400, "Mật khẩu hoặc email sai"));
        
      }
      const user = {
        id:userData.id,
        status:userData.status,
        role:userData.groupRole.name
      }
      // Tạo refresh token và access token
      const refreshToken = await this.userService.createRefreshToken(user);
      const accessToken = await this.userService.createAccessToken(user);
  
      // Lưu refresh token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Sử dụng https trong môi trường production
        sameSite: 'strict', // Giảm thiểu CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 // Thời gian hết hạn của refresh token (1 tuần)
      });
  
      // Trả về response với dữ liệu người dùng và access token
      return res.status(200).json(RepositoryDTO.WithData(200, "Đăng nhập thành công", {
        ...userData,
        token: accessToken
      }));
    } catch (error: any) {
      console.error(error); // Log lỗi chi tiết
    }
  }  
  @Get('/logout')
  async logout (@Res() res:Response){
      try {
          // Xóa cookie authToken
          res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
          // Trả về phản hồi thành công
          res.status(200).json(RepositoryDTO.Success("Đăng xuất thành công"));
        } catch (error) {
          console.log(error);
          throw error
        }
  }
    @Post('/register')
    @UseBefore(validateError(LoginModel))
    async register (@Body() model:LoginModel,@Res() res:Response){
    try{
        const data = await this.userService.create(model)
        return res.status(200).json(RepositoryDTO.WithData(200,"Đăng kí thành công",data))
    }catch(error:any){
        console.log(error);
        throw error
    }
}
@Get('/refreshToken')
async refreshToken(@Req() req: Request, @Res() res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Không có refresh token' });
    }

    // Sử dụng Promise thay cho callback
    const user = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, 'refreshToken', (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
    const accessToken = await this.userService.createAccessToken(user);
    return res.status(200).json(RepositoryDTO.WithData(200, 'Cấp lại token thành công', accessToken));
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ success: false, message: 'Refresh token không hợp lệ' });
    }
    console.error(error);
    throw error; // Ném lỗi để middleware xử lý lỗi toàn cục
  }
}
}




