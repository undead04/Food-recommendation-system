import { NextFunction, Request, Response } from "express";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import FavouriteService from "../services/FavouriteService";
import { FavouriteModel } from "../models/modelRequest/FavouriteModel";
import { authenticateToken, AuthRequest } from "../Middlewares/Auth";
import {  Delete, Get, JsonController, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import validateError from "../Middlewares/ValidateErrorDTO";
@JsonController('/favourite')
export default class FavouriteController{
    protected service:FavouriteService
    constructor(){
         this.service = new FavouriteService()
    }
    @Post('/')
    @UseBefore(authenticateToken(),validateError(FavouriteModel))
    async create(@Req() req:AuthRequest,@Res() res:Response){
        try{
            const userId = req._id
            // Tạo đối tượng từ request body
            const models:FavouriteModel=req.body;
            await this.service.create({
                user:{id:userId},
                recipe:{id:models.recipeId}
            })
            return res.status(200).json(RepositoryDTO.Success("Thêm đồ ăn vào danh sách yêu thích thành công"))
        }catch(error:any){
            console.log(error)
            throw error
        }
    
    }
    @Delete('/:id')
    @UseBefore(authenticateToken())
    async remove (@Param('id') id:number, @Req() req:AuthRequest,@Res() res:Response){
        try{
            console.log(id)
            const userId = req._id
            await this.service.remove(id,userId)
            return res.status(200).json(RepositoryDTO.Success("Xóa ra khỏi danh sách đồ ăn yêu thích thành công"))
        }catch(error:any){
            console.log(error)
            throw error
        }
    }
    @Delete('/')
    @UseBefore(authenticateToken())
    async removeArray (@Req() req:AuthRequest,@Res() res:Response){
        try{
            const model:DeleteModel=req.body;
            const userId = req._id
            await this.service.removeArray(model.ids,userId)
            res.status(200).json(RepositoryDTO.Success("Xóa ra khỏi danh sách đồ ăn yêu thích thành công"))
         }catch(error:any){
             console.log(error)
                throw error
         }
    }
    @Get('/')
    @UseBefore(authenticateToken())
    async getFilter (@Req() req:AuthRequest,@Res() res:Response){
        try{
            const {name,pageSize,page} = req.query
            const nameString = name as string
            const pageNumber = Number(page)||1
            const pageSizeNumber = Number(pageSize)||10
            const userId = req._id
            const data = await this.service.getFillter(userId,nameString,pageNumber,pageSizeNumber)
            return res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
        }catch(error){
            console.log(error)
            throw error
        }
    }
}