import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { AutoBind } from "../utils/AutoBind";
import IngredientService from "../services/IngredientService";
import { IngredinetModel } from "../models/modelRequest/IngredientModel";
import { DeleteModel } from "../models/modelRequest/DeleteModel";

export default class IngredientController extends BaseController<IngredientService>{
    constructor(){
        const ingredientService = new IngredientService()
        super(ingredientService)
    }
    @AutoBind
    async createArray(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            // Tạo đối tượng từ request body
            const models:IngredinetModel[]=req.body;
            await this.service.createArray(models)
            res.status(200).json(RepositoryDTO.Success("Tạo các nguyên liệu thành công"))
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
            res.status(200).json(RepositoryDTO.Success("Xóa các nguyên liệu thành công"))
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