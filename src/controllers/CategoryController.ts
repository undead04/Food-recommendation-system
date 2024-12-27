import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import BaseController from "./BaseController";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { AutoBind } from "../utils/AutoBind";
import { CategoryModel } from "../models/modelRequest/CategoryModel";
import { DeleteModel } from "../models/modelRequest/DeleteModel";

export default class CategoryController extends BaseController<CategoryService>{
    constructor(){
        const categoryService = new CategoryService()
        super(categoryService)
    }
    @AutoBind
    async createArray(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
          
            // Tạo đối tượng từ request body
            const models:CategoryModel[]=req.body;
            await this.service.createArray(models)
            res.status(200).json(RepositoryDTO.Success("Tạo thể loại đồ ăn thành công"))
        }catch(error:any){
            console.log(error)
            next(error)
        }
    
    }
    @AutoBind
    async removeArray (req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const model:DeleteModel=req.body;
            await this.service.removeArray(model.ids)
            res.status(200).json(RepositoryDTO.Success("Xóa thể loại đồ ăn thành công"))
         }catch(error:any){
             console.log(error)
             next(error)
         }
    }
    @AutoBind
    async getFilter (req:Request,res:Response,next:NextFunction){
        try{
            const {name,orderBy,sort,pageSize,page} = req.query
            const nameString = name as string
            const pageNumber = Number(page)||1
            const pageSizeNumber = Number(pageSize)||10
            const orderByField=orderBy as string;
            const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
            const data = await this.service.getFillter(nameString,orderByField,sortOrder,pageNumber,pageSizeNumber)
            res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}