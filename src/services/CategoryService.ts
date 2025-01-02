import { DeepPartial } from "typeorm";
import { Category } from "../entitys/Category";
import { IPagination } from "./BaseRepository";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";

export default class CategoryService extends BaseService<Category>{
    
    constructor(){
        super(Category,'category')
    }
    protected transfromDTO(data: DeepPartial<Category>): DeepPartial<Category> {
        return data
    }
    protected async unique(data:DeepPartial<Category>){
        const record = await (await this.repository.getBy(data.name,'name')).getOne()
        if(record){
            return record
        }
        
    }
    protected async validate(id: number, data: DeepPartial<Category>): Promise<void> {
        const record = await this.unique(data)
        if(record && record.id !== id){
            throw new CustomError(`Tên thể loại này đã tồn tại name = ${record.name}`,400,'name')
        }
    }
    async getFilter (name?:string,orderBy?:string,sort?:string,page?: number, pageSize?: number): Promise<IPagination<Category>> {
        const queryBuilder = await this.repository.createQueryBuilder()
        const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
        if (name) {
            // Đảm bảo truyền giá trị name vào một cách an toàn
            queryBuilder.where(`
                MATCH (category.name) AGAINST (:name IN BOOLEAN MODE)
            `, {name:`*${name}*`});
        }
        if(orderBy){
            queryBuilder.orderBy(`category.${orderBy}`,sortOrder)
        }
        const data = await this.repository.getPagination(queryBuilder,page,pageSize)
        return data
    }
    
}