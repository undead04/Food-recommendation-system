import { Get, JsonController, QueryParams, Req, Res, UseBefore } from "routing-controllers";
import HintRecipeService from "../services/HintRecipeService";
import { authenticateToken, AuthRequest } from "../Middlewares/Auth";
import { Response } from "express";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { notFound } from "../Middlewares/NotFoundHandle";
import { Recipe } from "../entitys/Recipe";
import CustomError from "utils/CustumError";
@JsonController("/hint")
export default class HintRecipeController{
    protected service = new HintRecipeService()
    @Get('/ingredient')
    @UseBefore(authenticateToken())
    async getHintIngredient(@QueryParams() filter:any,@Req() req:AuthRequest,@Res() res:Response){
        const id = req._id
        if(!filter.ingredientIds){
            throw new CustomError("Bắt buộc phải có ingredientIds",400)
        }
        const data = await this.service.getHintIngredient(filter.ingredientIds.toString().split(',')||[],id,filter.page||1,
            filter.pagesize||10
        )
        return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
    }
    @Get('/ingredient/public')
    async getHintIngredientPublic(@QueryParams() filter:any,@Req() req:AuthRequest,@Res() res:Response){
        const id = req._id
        const data = await this.service.getHintIngredient(filter.ingredientIds.toString().split(',')||[],id,filter.page||1,
            filter.pagesize||10
        )
        return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
    }
    @Get('/recipeUser')
    @UseBefore(authenticateToken())
    async getHintUser(@QueryParams() filter:any,@Req() req:AuthRequest,@Res() res:Response){
        const id = req._id
        const data = await this.service.getHintUser(id,filter.page||1,
            filter.pagesize||10
        )
        return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
    }
    @Get('/recipeSimilar/:id')
    @UseBefore(notFound(Recipe,'recipe'))
    async getHintSimilar(@QueryParams() filter:any,@Req() req:AuthRequest,@Res() res:Response){
        const id = Number(req.params.id)
        const data = await this.service.getHintSimilar(id,filter.page||1,
            filter.pagesize||10
        )
        return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
    }
    @Get('/recipeHightly')
    async getHighlyAppreciated(@QueryParams() filter:any ,@Res() res:Response){
        const data = await this.service.getHighlyAppreciated(filter.page||1,
            filter.pagesize||10
        )
        return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
    }

}