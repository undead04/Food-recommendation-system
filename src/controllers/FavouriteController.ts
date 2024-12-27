import { NextFunction, Request, Response } from "express";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { AutoBind } from "../utils/AutoBind";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import FavouriteService from "../services/FavouriteService";
import { FavouriteModel } from "../models/modelRequest/FavouriteModel";
import { AuthRequest } from "../Middlewares/Auth";

export default class FavouriteController{
    protected service:FavouriteService
    constructor(){
         this.service = new FavouriteService()
        
    }
    @AutoBind
    async create(req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
        try{
            const userId = req._id
            // Tạo đối tượng từ request body
            const models:FavouriteModel=req.body;
            await this.service.create({
                user:{id:userId},
                recipe:{id:models.recipeId}
            })
            res.status(200).json(RepositoryDTO.Success("Thêm đồ ăn vào danh sách yêu thích thành công"))
        }catch(error:any){
            console.log(error)
            next(error)
        }
    
    }
    @AutoBind
    async remove (req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
        try{
            const id = Number(req.params.id)
            const userId = req._id
            await this.service.remove(id,userId)
            res.status(200).json(RepositoryDTO.Success("Xóa ra khỏi danh sách đồ ăn yêu thích thành công"))
        }catch(error:any){
            console.log(error)
            next(error)
        }
    }
    @AutoBind
    async removeArray (req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
        try{
            const model:DeleteModel=req.body;
            const userId = req._id
            await this.service.removeArray(model.ids,userId)
            res.status(200).json(RepositoryDTO.Success("Xóa ra khỏi danh sách đồ ăn yêu thích thành công"))
         }catch(error:any){
             console.log(error)
             next(error)
         }
    }
    @AutoBind
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const id = Number(req.params.id)
            const data = await this.service.getById(id)
            res.status(200).json(RepositoryDTO.WithData(200,"Lấy dữ liệu thành công",data))
        }catch(error:any){
            console.log(error)
            next(error)
        }
    }
    @AutoBind
    async getFilter (req:AuthRequest,res:Response,next:NextFunction){
        try{
            const {name,pageSize,page} = req.query
            const nameString = name as string
            const pageNumber = Number(page)||1
            const pageSizeNumber = Number(pageSize)||10
            const userId = req._id
            const data = await this.service.getFillter(userId,nameString,pageNumber,pageSizeNumber)
            res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}