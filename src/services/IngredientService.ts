import { DeepPartial } from "typeorm";
import BaseRepository, { IPagination } from "./BaseRepository";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { Ingredient } from "../entitys/Ingredient";

export default class IngredientService extends BaseService<Ingredient>{
    constructor(){
        super(Ingredient,'ingredient')
    }
    async getFilter (name?:string,type?:string,orderBy?:string,sort?:string,page?:number,pageSize?:number): Promise<IPagination<Ingredient>> {
            const queryBuilder = await this.repository.createQueryBuilder()
            const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
            if (name) {
                // Đảm bảo truyền giá trị name vào một cách an toàn
                queryBuilder.where(`
                    MATCH (ingredient.name) AGAINST (:name IN BOOLEAN MODE)
                `, {name:`*${name}*`});
            }
            if(type){
                queryBuilder.andWhere('ingredient.ingredientTypeId =:type',{type})
            }
            if(orderBy){
                queryBuilder.orderBy(`ingredient.${orderBy}`,sortOrder)
            }
            const data = await this.repository.getPagination(queryBuilder,page,pageSize)
            return data
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
    
}