import { Get, JsonController, Param, Res, UseBefore } from "routing-controllers"
import { authenticateToken } from "../Middlewares/Auth"
import {  Response } from "express"
import StatisticsService from "../services/StatisticsService"
import { RepositoryDTO } from '../utils/ReponseDTO';
import AppRole from "../models/modelRequest/AppRole";

@JsonController('/statistics')
export default class StatisticsController{
    private service = new StatisticsService()
    @Get('/recipe')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async statisticsRecipe(@Res() res:Response){
        const data = await this.service.statisticsRecipe()
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }

    @Get('/highlyUsers')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async statisticsHighlyAppreciatedUsers(@Res() res:Response){
        const data = await this.service.statisticsHighlyAppreciatedUsers()
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }

    @Get('/recipeEngagement/:id')
    @UseBefore(authenticateToken())
    async statisticsRecipeEngagement(@Param('id') id:number ,@Res() res:Response){
        const data = await this.service.statisticsRecipeEngagement(id)
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }

    @Get('/recipeRegion')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async statisticsRecipesByRegion(@Res() res:Response){
        const data = await this.service.statisticsRecipesByRegion()
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }

    @Get('/recipeCategory')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async statisticsRecipesByCategory(@Res() res:Response){
        const data = await this.service.statisticsRecipesByCategory()
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }

    @Get('/recipeTime')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async statisticsRecipesTime(@Res() res:Response){
        const data = await this.service.statisticsRecipesTime()
        return res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
    }
}