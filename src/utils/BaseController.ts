import { JsonController, Param, Body, Put, Post, Delete, Get, Res, QueryParams, UseBefore, Req } from "routing-controllers";
import {  Response } from "express";
import { RepositoryDTO } from "./ReponseDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { AuthRequest } from "Middlewares/Auth";

@JsonController()
export default class BaseController<TService>{
  protected service: TService;
  constructor(service: TService) {
    this.service = service;
  }

  // CREATE - Tạo mới một bản ghi
  @Post('/')
  async create(@Body() data: any, @Res() res: Response,@Req() req?:AuthRequest) {
    try {
      const createdData = await (this.service as any).create(data);
      return this.sendResponse(res, 201, "Tạo thành công", createdData);
    } catch (error) {
      throw error
    }
  }

  // READ - Lấy danh sách bản ghi
  @Get('/')
  async getFilter(@QueryParams() filter:any,@Res() res: Response) {
    try {
      
      
    } catch (error) {
      return this.sendError(res, "Có lỗi xảy ra khi lấy dữ liệu", 500);
    }
  }

  // READ - Lấy một bản ghi theo ID
  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await (this.service as any).getById(id);
      return this.sendResponse(res, 200, "Lấy dữ liệu thành công", data);
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // UPDATE - Cập nhật bản ghi
  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: any, @Res() res: Response,@Req() req?: AuthRequest) {
    try {
      await (this.service as any).update(id, data);
      return this.sendSuccess(res, "Cập nhật thành công");
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // DELETE - Xóa bản ghi
  @Delete('/')
  async deleteArray(@Body() data:DeleteModel,@Res() res:Response) {
    try{
      await (this.service as any).removeArray(data.ids)
      return this.sendSuccess(res,'Xóa thành công')
    }catch(error){
      console.log(error)
      throw error
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Res() res: Response,@Req() req?:AuthRequest) {
    try {
      await (this.service as any).remove(id);
      return this.sendSuccess(res, "Xóa thành công");
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // Phương thức trả về phản hồi thành công
  protected sendResponse(res: Response, status: number, message: string, data: any) {
    return res.status(status).json(RepositoryDTO.WithData(status,message,data));
  }
  protected sendSuccess(res: Response,message:string,status:number = 200){
    return res.status(status).json(RepositoryDTO.Success(message))
  }
  // Phương thức trả về lỗi
  protected sendError(res: Response, message: string, status: number = 400) {
    return res.status(status).json(RepositoryDTO.Error(status,message));
  }
}
