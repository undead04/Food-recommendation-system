import { Request } from "express";
import jwt from "jsonwebtoken";
import { statusUser } from "../entitys/User";
export interface UserToken {
  id: number;
  role: string;
  status: number;
}
export function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "JWT") {
    console.log(scopes);
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return Promise.reject(new Error("Không có token"));
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, "accessToken", (err, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          // Kiểm tra trạng thái tài khoản
          if (decoded.status === statusUser.peding) {
            reject(new Error("Tài khoản của bạn chưa kích hoạt"));
          }
          // Kiểm tra vai trò người dùng nếu cần (scopes)
          if (scopes && !scopes.includes(decoded.role)) {
            reject(new Error("Bạn không đủ quyền hạn để vào API này"));
          }
          const userInfo: UserToken = {
            id: decoded.id,
            role: decoded.role,
            status: decoded.status,
          };
          request.user = userInfo;
          resolve(userInfo);
        }
      });
    });
  }

  return Promise.reject(new Error("Hệ thống xác thực không hỗ trợ"));
}
