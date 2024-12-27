import express from 'express';
import AuthController from '../controllers/AuthController';
import ValidateErrorDTO from '../Middlewares/ValidateErrorDTO';
import { LoginModel } from '../models/modelRequest/UserModel';

const router = express.Router();
const authController=new AuthController()
const validateLogin = new ValidateErrorDTO(LoginModel)
// Lấy tất cả genres với filter và phân trang
router.post('/login'
    ,validateLogin.ValidateError
    ,authController.login);
router.post("/register"
    ,validateLogin.ValidateError
    ,authController.register
)
router.get("/logout",authController.logout)


export default router;
