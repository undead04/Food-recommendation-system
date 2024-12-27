import { User } from "../entitys/User";
import BaseService from "./BaseService";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { DeepPartial } from "typeorm";
import BaseRepository from "./BaseRepository";
import { GroupRole } from "../entitys/GroupRole";
import AppRole from "../models/modelRequest/AppRole";
import CustomError from "../utils/CustumError";
export default class UserService extends BaseService<User>{
    protected groupRoleRepo = new BaseRepository(GroupRole,'groupRole')
    constructor(){
        super(User,'user')
    }
    protected async hashPassword(password:string){
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        // Băm mật khẩu với salt
        const hash = await bcrypt.hash(password, salt);
        return hash
    }
    protected async comparePassword(password:string,passwordHash:string){
        return await bcrypt.compare(password,passwordHash)
    }
    async generateToken(userData:User,password:string){
        if(userData==null) return null
        const isMatch:boolean= await this.comparePassword(password,userData.password)
        if(!isMatch) return null
        return jwt.sign({ id: userData.id, role:userData.groupRole.name }, 'authToken', { expiresIn: '1h' });
    }
    protected async uniqueName(data:DeepPartial<User>){
        const records = await this.getBy(data.username,'username')
        if(records){
            return records
        }
    }
    protected async validateBase(id: number): Promise<User> {
        const record = await (await this.repository.getBy(id)).getOne()
        if(record){
            return record
        }
        throw new CustomError(`Không tồn tại id = ${id} trong bản người dùng này`,404)
    }
    protected async validate(id: number, data: DeepPartial<User>): Promise<void> {
        const records = await this.uniqueName(data)
        if(records && records.id !==id){
            throw new CustomError(`Tên người dùng này đã tồn tại`,400,'username')
        }
    }
    async getBy(value: unknown, columnField?: string): Promise<User> {
        const rescord = (await this.repository.getBy(value,columnField))
        .leftJoinAndSelect("user.groupRole",'groupRole').getOne()
        return rescord
    }
    async getFilter(username?:string,orderBy?:string,sort?:string,page?:number,pageSize?:number){
        const sortOrder: "ASC" | "DESC" = (sort as "ASC" | "DESC") || "ASC";
        const queryBuilder = await this.repository.createQueryBuilder()
        if(username){
            queryBuilder.where(`
                MATCH (user.username) AGAINST (:name IN BOOLEAN MODE)
            `, {name:`*${username}*`});
        }
        if(orderBy){
            queryBuilder.orderBy(`user.${orderBy}`,sortOrder)
        }
        const data = await this.repository.getPagination(queryBuilder,page,pageSize)
        return data
    }
    async create(data: DeepPartial<User>): Promise<User> {
        const role =await (await this.groupRoleRepo.getBy(AppRole.User,'name')).getOne()
        const hashPassword = await this.hashPassword(data.password)
        return await super.create({
            ...data,
            password:hashPassword,
            groupRole:{id:role.id}
        })
    }
}