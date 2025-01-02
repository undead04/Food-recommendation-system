import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RepositoryDTO } from '../utils/ReponseDTO';
import { statusUser } from '../entitys/User';

export interface AuthRequest extends Request {
  _id?: number;
  role: string;
}

// Middleware kiểm tra xác thực và vai trò
export const authenticateToken = (roles?: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json(RepositoryDTO.Error(401, "Không có token")); // Nếu không có token thì từ chối truy cập
      }

      // Xác thực token và chuyển từ callback sang Promise
      const user: any = await new Promise((resolve, reject) => {
        jwt.verify(token, 'accessToken', (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      // Kiểm tra trạng thái tài khoản
      if (user.status === statusUser.peding) {
        return res.status(403).json(RepositoryDTO.Error(403, 'Tài khoản của bạn chưa kích hoạt'));
      }
      req._id = user.id;
      req.role = user.role;

      // Kiểm tra vai trò của người dùng
      if (roles && !roles.includes(user.role)) {
        return res.status(403).json(RepositoryDTO.Error(403, "Bạn không đủ quyền hạn để vào API này"));
      }

      next(); // Tiếp tục xử lý yêu cầu nếu vai trò hợp lệ
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json(RepositoryDTO.Error(401, "Token hết hạn")); // Token hết hạn
      }
      return res.status(403).json(RepositoryDTO.Error(403, "Token không hợp lệ")); // Token không hợp lệ
    }
  };
};
