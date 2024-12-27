import { NextFunction, Request, Response } from 'express';
import { RepositoryDTO } from '../utils/ReponseDTO';
import { AutoBind } from '../utils/AutoBind';

// BaseController có thể nhận bất kỳ kiểu service nào
export default class BaseController<TService> {
  protected service: TService;

  constructor(service: TService) {
    this.service = service;
  }

  @AutoBind
  async getFilter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Logic tìm kiếm với filter (nếu cần)
      res.status(200).json(RepositoryDTO.WithData(200, 'Lấy dữ liệu thành công', {}));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @AutoBind
  // Lấy một bản ghi theo ID
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      // Dùng `any` để truy cập phương thức của service
      const data = await (this.service as any).getById(id); // Truy cập phương thức của service
      res.status(200).json(RepositoryDTO.WithData(200, 'Lấy dữ liệu thành công', data));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @AutoBind
  // Tạo một bản ghi mới
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      await (this.service as any).create(body); // Dùng `any` để truy cập phương thức của service
      res.status(201).json(RepositoryDTO.Success('Tạo dữ liệu thành công'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @AutoBind
  // Cập nhật một bản ghi theo ID
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const body = req.body;
      await (this.service as any).update(id, body); // Dùng `any` để truy cập phương thức của service
      res.status(200).json(RepositoryDTO.Success('Cập nhật dữ liệu thành công'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @AutoBind
  // Xóa một bản ghi theo ID
  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await (this.service as any).remove(id); // Dùng `any` để truy cập phương thức của service
      res.status(200).json(RepositoryDTO.Success('Xóa dữ liệu thành công'));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
