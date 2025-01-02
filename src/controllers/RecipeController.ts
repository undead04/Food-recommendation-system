import { Response } from "express";
import BaseController from "../utils/BaseController";
import RecipeService from "../services/RecipeService";
import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParams, Res, UseBefore } from "routing-controllers";
import { authenticateToken } from "../Middlewares/Auth";
import AppRole from "../models/modelRequest/AppRole";
import { RecipeModel } from "../models/modelRequest/RecipeModel";
import validateError from "../Middlewares/ValidateErrorDTO";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { Recipe } from "../entitys/Recipe";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { RecipeIngredient } from "entitys/Recipe_Ingredient";
@JsonController('/recipe')
export default class RecipeController extends BaseController<RecipeService>{
    constructor(){
        const recipeService = new RecipeService()
        super(recipeService)
    }
    @Get('/')
    async getFilter(@QueryParams() filter:any,@Res() res: Response) {
      const ingredient = filter.ingredientId?filter.ingredientId.toString().split(','):""
      const category = filter.categoryId?filter.categoryId.toString().split(','):""
      const data = await this.service.getFilter(filter.name||"",ingredient,category,
          filter.orderBy||"",filter.sort||"",filter.page||1,filter.pageSize||10
        )
      return this.sendResponse(res,200,'Lấy dữ liệu thành công',data)
    }
    
    @Post('/')
    @UseBefore(authenticateToken([AppRole.Admin]),validateError(RecipeModel),validateError(RecipeIngredient))
    async create(@Body() data: RecipeModel, @Res() res: Response) {
      return await super.create(data,res)
  
    }
  
    // UPDATE - Cập nhật bản ghi
    @Put('/:id')
    @UseBefore(authenticateToken([AppRole.Admin]),notFound(Recipe,'recipe'),validateError(RecipeModel),validateError(RecipeIngredient))
    async update(@Param('id') id: number, @Body() data: RecipeModel, @Res() res: Response) {
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
    @UseBefore(authenticateToken([AppRole.Admin]),notFoundArray(Recipe,'recipe'),validateError(DeleteModel))
    async deleteArray(@Body() data: DeleteModel, @Res() res: Response): Promise<Response<any, Record<string, any>>> {
      return await super.deleteArray(data,res)
    }
}