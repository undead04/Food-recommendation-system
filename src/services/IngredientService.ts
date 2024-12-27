import { DeepPartial } from "typeorm";
import { IPagination } from "./BaseRepository";
import BaseService from "./BaseService";
import CustomError from "../utils/CustumError";
import { IsDuplicatesWithSort } from "../utils/GenerationCode";
import dataSource from "../dataSource";
import { Ingredient } from "../entitys/Ingredient";

export default class IngredientService extends BaseService<Ingredient>{
    constructor(){
        super(Ingredient,'ingredient')
    }
    async getFillter (name?:string,orderBy?:string,sort?:string,page?: number, pageSize?: number): Promise<IPagination<Ingredient>> {
            const queryBuilder = await this.repository.createQueryBuilder()
            const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
            if (name) {
                // Đảm bảo truyền giá trị name vào một cách an toàn
                queryBuilder.where(`
                    MATCH (ingredient.name) AGAINST (:name IN BOOLEAN MODE)
                `, {name:`*${name}*`});
            }
            if(orderBy){
                queryBuilder.orderBy(`ingredient.${orderBy}`,sortOrder)
            }
            const data = await this.repository.getPagination(queryBuilder,page,pageSize)
            return data
        }   
    protected async validateBase(id: number) {
        const records =await (await this.repository.getBy(id)).getOne()
        if(records == null){
            throw new CustomError(`Không tồn tại id = ${id} trong bản nguyên liệu này này`,404)
        }
        return records
    }
    protected async unique(data:DeepPartial<Ingredient>){
        const record = await (await this.repository.getBy(data.name,'name')).getOne()
        if(record){
            return record
        }
        
    }
    protected async validate(id: number, data: DeepPartial<Ingredient>): Promise<void> {
        const record = await this.unique(data)
        if(record && record.id !== id){
            throw new CustomError(`Tên nguyên liệu này đã tồn tại name = ${record.name}`,400,'name')
        }
    }
    async createArray(datas:DeepPartial<Ingredient>[]){
        const arrayData = datas.map(data=>({
            name:data.name.trim().toLowerCase()
        }))
        if(IsDuplicatesWithSort(arrayData)){
            throw new CustomError(`Trong model có tên bị trùng`,400)
        }
        await Promise.all(datas.map(async(data)=>await this.validate(0,data)))
        await dataSource.manager.transaction(async(transactionEntityManager)=>{
            await this.repository.createArray(datas,transactionEntityManager)
        })
    }
    
}