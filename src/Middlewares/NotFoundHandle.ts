import { NextFunction, Request, Response } from 'express';
import { RepositoryDTO } from '../utils/ReponseDTO';
import { AutoBind } from '../utils/AutoBind';
import { IsDuplicatesWithSort } from '../utils/GenerationCode';
import BaseRepository from '../services/BaseRepository';
import { EntityTarget, ObjectLiteral } from 'typeorm';
import { DeleteModel } from '../models/modelRequest/DeleteModel';


// Function kiểm tra dữ liệu có tồn tại không
export default class NotFoundHandle<T extends ObjectLiteral>{
    protected repo:BaseRepository<T>
    protected message:string
    constructor(entity:EntityTarget<T>,alias:string,message:string){
        this.repo = new BaseRepository(entity,alias)
        this.message = message
    }
    protected async validateNotFoud(id:number,res:Response,req?:Request){
        const record = await (await this.repo.getBy(id)).getOne()
        if(record==null){
            res.status(404).json(RepositoryDTO.Error(404,`Không tồn tại id = ${id} trong ${this.message}`))
            return true
        }
        if(req){
            (req as any).record = record
        }
        return false
    }

    @AutoBind
    async IsNotFound(req:Request,res:Response,next:NextFunction){
        try{
            const id = Number(req.params.id);
            if (!/^\d+$/.test(id.toString())) {
                res.status(400).json(RepositoryDTO.Error(400,"Invalid ID format"));
                return
            }
            if(await this.validateNotFoud(id,res,req)) return
            
            next()
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    
    @AutoBind
    async IsNotFoundArray(
        req:Request,
        res:Response,
        next:NextFunction
    ){
        const models:DeleteModel=req.body
        if(IsDuplicatesWithSort(models.ids)){
            res.status(400).json(RepositoryDTO.Error(400,`Trong model có tên bị trùng`))
            return
        }
        await Promise.all(models.ids.map(async(id)=>{
            if(await this.validateNotFoud(id,res)){
                return
            }
        }))
        next()
        
     }
}




