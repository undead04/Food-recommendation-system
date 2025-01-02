import { Response } from "express";
import BaseController from "../utils/BaseController";
import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams, Req, Res, UseAfter, UseBefore } from "routing-controllers";
import { authenticateToken, AuthRequest } from "../Middlewares/Auth";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { CategoryModel } from "../models/modelRequest/CategoryModel";
import { Category } from "../entitys/Category";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import RatingService from "services/RatingService";
import { RatingModel } from "models/modelRequest/RatingModel";
import { da } from "@faker-js/faker/.";
import { Rating } from "entitys/Rating";
import { Admin } from "typeorm";

@JsonController("/rating")
export default class RatingController extends BaseController<RatingService>{
    
    constructor(){
        const service = new RatingService()
        super(service)
    }
    
     // READ - Lấy danh sách bản ghi
  @Get('/')
  async getFilter(@QueryParams() filter:any,@Res() res: Response) {
    const data = await this.service.getFilter(filter.recipeId||"",filter.start||"",
        filter.orderBy||"",filter.sort||"",filter.page||1,filter.pageSize||10
      )
    return this.sendResponse(res,200,'Lấy dữ liệu thành công',data)
  }
  @Post('/')
  @UseBefore(authenticateToken(),validateError(RatingModel))
  async create(@Body() data: RatingModel, @Res() res: Response,@Req() req:AuthRequest) {
    const userId = req._id
    const model = this.service.transfromDTO({...data,userId})
    return await super.create(model,res,req)
  }

  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response) {
    return await super.getOne(id,res)
  }
  @Get('/:id/getme')
  @UseBefore(authenticateToken())
  async getMe(@Param('id') id: number, @Res() res: Response,@Req() req:AuthRequest) {
    try{
        const userId = req._id
        const data = await this.service.getRatingMe(userId,id)
        return super.sendResponse(res,200,"Lấy dữ liệu thành công",data)
    }catch(error){
        console.log(error)
        throw error
    }
  }

  @Put('/:id')
  @UseBefore(authenticateToken(),notFound(Rating,'rating'),validateError(RatingModel))
  async update(@Param('id') id: number, @Body() data: RatingModel, @Res() res: Response,@Req() req:AuthRequest) {
    const userId = req._id
    const model = this.service.transfromDTO({...data,userId})
    return await super.update(id,model,res)
  }

  @Delete('/:id')
  @UseBefore(authenticateToken(),notFound(Rating,'rating'))
  async delete(@Param('id') id: number, @Res() res: Response,@Req() req:AuthRequest) {
    const userId = req._id
    await this.service.validateRemove(id,userId)
    return await super.delete(id,res)
  }
  
  @Delete('/')
  @UseBefore(authenticateToken([AppRole.Admin]),notFoundArray(Rating,'rating'),validateError(DeleteModel))
  async deleteArray(@Body() data: DeleteModel, @Res() res: Response): Promise<Response<any, Record<string, any>>> {

    return await super.deleteArray(data,res)
  }

}