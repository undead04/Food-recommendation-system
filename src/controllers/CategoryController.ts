import { Response } from "express";
import BaseController from "../utils/BaseController";
import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams, Res, UseAfter, UseBefore } from "routing-controllers";
import { authenticateToken } from "../Middlewares/Auth";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import CategoryService from "../services/CategoryService";
import { CategoryModel } from "../models/modelRequest/CategoryModel";
import { Category } from "../entitys/Category";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";

@JsonController("/category")
export default class CategoryController extends BaseController<CategoryService>{
    
    constructor(){
        const service = new CategoryService()
        super(service)
    }
    
     // READ - Lấy danh sách bản ghi
  @Get('/')
  async getFilter(@QueryParams() filter:any,@Res() res: Response) {
    const data = await this.service.getFilter(filter.name||"",
        filter.orderBy||"",filter.sort||"",filter.page||1,filter.pageSize||10
      )
    return this.sendResponse(res,200,'Lấy dữ liệu thành công',data)
  }
  @Post('/')
  @UseBefore(authenticateToken([AppRole.Admin]),validateError(CategoryModel))
  @UseAfter()
  async create(@Body() data: CategoryModel, @Res() res: Response) {
    return await super.create(data,res)
  }

  // UPDATE - Cập nhật bản ghi
  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    return await super.getOne(id,res)
  }

  // UPDATE - Cập nhật bản ghi
  @Put('/:id')
  @UseBefore(authenticateToken([AppRole.Admin]),notFound(Category,'category'),validateError(CategoryModel))
  async update(@Param('id') id: number, @Body() data: CategoryModel, @Res() res: Response) {
    return await super.update(id,data,res)
  }

  @Delete('/:id')
  @UseBefore(authenticateToken([AppRole.Admin]))
  async delete(@Param('id') id: number, @Res() res: Response) {
    return await super.delete(id,res)
  }
  
  @Delete('/')
  @UseBefore(authenticateToken([AppRole.Admin]),notFoundArray(Category,'category'),validateError(DeleteModel))
  async deleteArray(@Body() data: DeleteModel, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    return await super.deleteArray(data,res)
  }

}