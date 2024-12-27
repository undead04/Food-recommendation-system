import BaseRepository from './BaseRepository';
import { DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';
import dataSource from '../dataSource';

export default abstract class BaseService<T extends ObjectLiteral> {
  protected repository: BaseRepository<T>;

  constructor(entity: EntityTarget<T>,alias:string) {
    this.repository = new BaseRepository<T>(entity,alias);
  }
  protected abstract validate(id: number, data: DeepPartial<T>): Promise<void>;
  protected abstract validateBase(id:number):Promise<T>;
  // Tạo mới một đối tượng
  async create(data: DeepPartial<T>): Promise<T> {
    await this.validate(0,data)
    return this.repository.create(data);
  }
  
  // Lấy một đối tượng theo ID
  async getById(value: number): Promise<T | null> {
    const records = await this.validateBase(value)
    return records
  }

  // Cập nhật một đối tượng
  async update(id: number, data: DeepPartial<T>): Promise<void> {
    await this.validate(id,data)
    return this.repository.update(id, data);
  }

  // Xóa một đối tượng
  async remove(id: number): Promise<void> {
    const record = await this.validateBase(id)
    return this.repository.remove(record);
  }

  async removeArray(ids:number[]):Promise<void>{
    await dataSource.manager.transaction(async(transactionEntityManager)=>{
        await this.repository.removeArray(ids,transactionEntityManager)
    })
}
}
