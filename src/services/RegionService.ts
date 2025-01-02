import { DeepPartial } from "typeorm";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { Region } from "../entitys/Region";

export default class RegionService extends BaseService<Region>{
    
    constructor(){
        super(Region,'region')
    }
    protected transfromDTO(data: DeepPartial<Region>): DeepPartial<Region> {
        return data
    }
    protected async unique(data:DeepPartial<Region>){
        const record = await (await this.repository.getBy(data.name,'name')).getOne()
        if(record){
            return record
        }
        
    }
    protected async validate(id: number, data: DeepPartial<Region>): Promise<void> {
        const record = await this.unique(data)
        if(record && record.id !== id){
            throw new CustomError(`Tên thể loại này đã tồn tại name = ${record.name}`,400,'name')
        }
    }
    async getFilter (name?:string): Promise<Region[]> {
        const queryBuilder = await (await this.repository.createQueryBuilder())
        .select(['region.id','region.name']).limit(10)
        if (name) {
            // Đảm bảo truyền giá trị name vào một cách an toàn
            queryBuilder.where(`
                MATCH (region.name) AGAINST (:name IN BOOLEAN MODE)
            `, {name:`*${name}*`});
        }
        const data = await queryBuilder.getMany()
        return data
    }
    
}