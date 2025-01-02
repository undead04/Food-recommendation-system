import { Response } from "express";
import BaseController from "../utils/BaseController";
import IngredientService from "../services/IngredientService";
import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams, Res, UseBefore } from "routing-controllers";
import { authenticateToken } from "../Middlewares/Auth";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { IngredientModel } from "../models/modelRequest/IngredientModel";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { Ingredient } from "../entitys/Ingredient";

@JsonController("/ingredient")
export default class IngredientController extends BaseController<IngredientService>{
    
    protected validateDTO;
    constructor(){
        const service = new IngredientService()
        super(service)
    }
    
     // READ - Lấy danh sách bản ghi
  @Get('/')
  async getFilter(@QueryParams() filter:any,@Res() res: Response) {
    const data = await this.service.getFilter(filter.name||"",filter.type||"",
      filter.orderby||"",filter.sort||"",filter.page||1,filter.pagesize||10
    )
    return this.sendResponse(res,200,'Lấy dữ liệu thành công',data)
  }

  @Post('/')
  @UseBefore(authenticateToken([AppRole.Admin]),validateError(IngredientModel))
  async create(@Body() data: IngredientModel, @Res() res: Response) {
    return await super.create(data,res)
  }

  // UPDATE - Cập nhật bản ghi
  @Put('/:id')
  @UseBefore(authenticateToken([AppRole.Admin]),notFound(Ingredient,'ingredient'),validateError(IngredientModel))
  async update(@Param('id') id: number, @Body() data: IngredientModel, @Res() res: Response) {
    return await super.update(id,data,res)
  }
  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    return await super.getOne(id,res)
  }
  @Delete('/:id')
  @UseBefore(authenticateToken([AppRole.Admin]))
  async delete(@Param('id') id: number, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    return await super.delete(id,res)
  }
  @Delete('/')
  @UseBefore(authenticateToken([AppRole.Admin]),notFoundArray(Ingredient,'ingredient'),validateError(DeleteModel))
  async deleteArray(@Body()data: DeleteModel, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
    return await super.deleteArray(data,res)
  }

}