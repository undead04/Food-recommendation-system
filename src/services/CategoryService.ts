import { DeepPartial } from "typeorm";
import { Category } from "../entitys/Category";
import { IPagination } from "../utils/BaseRepository";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { dataSource, redisCache } from "config/dataSource";
import { CategoryFilter, TypeSort } from "models/modelRequest/FilterModel";

export default class CategoryService extends BaseService<Category> {
  constructor() {
    super(Category, "category");
  }
  protected async unique(data: DeepPartial<Category>) {
    const record = await (
      await this.repository.getBy(data.name, "name")
    ).getOne();
    if (record) {
      return record;
    }
  }
  protected async validate(
    id: number,
    data: DeepPartial<Category>
  ): Promise<void> {
    const record = await this.unique(data);
    if (record && record.id !== id) {
      throw new CustomError(
        `Tên thể loại này đã tồn tại name = ${record.name}`,
        400,
        "name"
      );
    }
  }
  protected async isNotFound(id: number): Promise<Category> {
    const record = await (await this.repository.getBy(id)).getOne();
    if (record == null) {
      throw new CustomError(`Không tồn tại thể loại này id = ${id}`, 404);
    }
    return record;
  }
  protected async deleteCacheId(id: number) {
    const cacheKey = `category-${id}`;
    const cacheData = await redisCache.get(cacheKey);
    if (cacheData) {
      await redisCache.del(cacheKey);
      console.log("Remove cache");
    }
  }
  protected async deleteCacheFilter() {
    await redisCache.clearCacheByPattern("category-filter-*");
    console.log("Delete Cache Filter");
  }
  async getFilter(filter?: CategoryFilter): Promise<IPagination<Category>> {
    const { name, orderBy, sort, page, pageSize } = filter;
    const cacheKey = `category-filter-${orderBy || ""}-${sort || "ASC"}-${
      page || 1
    }-${pageSize || 10}`;
    // Kiểm tra nếu có cache trước
    const cachedData = await redisCache.get(cacheKey);
    if (cachedData && !name) {
      console.log("Data from cache");
      return cachedData; // Trả về dữ liệu từ cache
    }
    // Tạo một khóa cache duy nhất không bao gồm name
    const queryBuilder = await this.repository.createQueryBuilder();

    if (name) {
      // Đảm bảo truyền giá trị name vào một cách an toàn
      queryBuilder.where(
        `
                MATCH (category.name) AGAINST (:name IN BOOLEAN MODE)
            `,
        { name: `*${name}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `category.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    const data = await this.repository.getPagination(
      queryBuilder,
      page,
      pageSize
    );
    // Lưu dữ liệu vào cache với khóa duy nhất
    if (!name) await redisCache.set(cacheKey, data);
    return data;
  }
  async create(data: any): Promise<Category> {
    await this.validate(0, data);
    await this.deleteCacheFilter();
    return this.repository.create(data);
  }
  async getById(value: number): Promise<Category> {
    const cacheKey = `category-${value}`;
    const cacheData = await redisCache.get(cacheKey);
    if (cacheData) {
      console.log("Data from cache");
      return cacheData;
    }
    const record = await this.isNotFound(value);
    await redisCache.set(cacheKey, record);
    return record;
  }
  async update(id: number, data: any): Promise<void> {
    await this.validate(id, data);
    await this.deleteCacheId(id);
    await this.deleteCacheFilter();
    await this.repository.update(id, data);
  }
  async remove(id: number): Promise<void> {
    const record = await this.isNotFound(id);
    await this.deleteCacheId(id);
    await this.deleteCacheFilter();
    await this.repository.remove(record);
  }
  async removeArray(ids: number[]): Promise<void> {
    await Promise.all(ids.map(async (id) => await this.deleteCacheId(id)));
    await this.deleteCacheFilter();
    await dataSource.manager.transaction(async (entity) => {
      await this.repository.removeArray(ids, entity);
    });
  }
}
