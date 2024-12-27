import { NextFunction, Request, Response } from "express";
import BaseController from "./BaseController";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { AutoBind } from "../utils/AutoBind";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import RecipeService from "../services/RecipeService";

export default class RecipeController extends BaseController<RecipeService>{
    constructor(){
        const recipeService = new RecipeService()
        super(recipeService)
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
    async hintRecipe(req:Request,res:Response,next:NextFunction){
        try{
            const {ingredient,page,pageSize} =req.query
            const pageNumber = Number(page)||1
            const pageSizeNumber = Number(pageSize)||10
            const ingredientArray = ingredient ? ingredient.toString().split(','):null
            const data = await this.service.getRecipesWithIngredients(ingredientArray,pageNumber,pageSizeNumber)
            res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
        }catch(error){
            console.log(error)
            next(error)
        }
    }
    @AutoBind
    async getFilter (req:Request,res:Response,next:NextFunction){
        try{
            const {name,categoryId,ingredientId,orderBy,sort,pageSize,page} = req.query
            const nameString = name as string
            const pageNumber = Number(page)||1
            const pageSizeNumber = Number(pageSize)||10
            const orderByField=orderBy as string;
            const categoryArray = categoryId ? categoryId.toString().split(','):null
            const ingredientArray = ingredientId ? ingredientId.toString().split(','):null
            const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
            const data = await this.service.getFillter(nameString,ingredientArray,categoryArray,orderByField,sortOrder,pageNumber,pageSizeNumber)
            res.status(200).json(RepositoryDTO.WithData(200,'Lấy dữ liệu thành công',data))
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}