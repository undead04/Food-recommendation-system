import { IPagination } from "../utils/BaseRepository";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { Ingredient } from "../entitys/Ingredient";
import { redisCache } from "config/dataSource";
import { DeepPartial } from "typeorm";
import { IngredientFilter, TypeSort } from "models/modelRequest/FilterModel";

export default class IngredientService extends BaseService<Ingredient> {
  constructor() {
    super(Ingredient, "ingredient");
  }
  protected async isNotFound(id: number): Promise<Ingredient> {
    const record = await (await this.repository.getBy(id)).getOne();
    if (record == null) {
      throw new CustomError(`Không tồn tại nguyên liệu này  id = ${id}`, 404);
    }
    return record;
  }
  protected async deleteCacheId(id: number) {
    const cacheKey = `ingredient-${id}`;
    const cacheData = await redisCache.get(cacheKey);
    if (cacheData) {
      await redisCache.del(cacheKey);
      console.log("Remove cache");
    }
  }
  protected async deleteCacheFilter() {
    await redisCache.clearCacheByPattern("ingredient-filter-*");
    console.log("Delete Cache Filter");
  }
  async getFilter(filter?: IngredientFilter): Promise<IPagination<Ingredient>> {
    const { orderBy, sort, page, pageSize, name } = filter;
    const cacheKey = `ingredient-filter-${orderBy || ""}-${sort || "ASC"}-${
      page || 1
    }-${pageSize || 10}`;
    // Kiểm tra nếu có cache trước
    const cachedData = await redisCache.get(cacheKey);
    if (cachedData && !name) {
      console.log("Data from cache");
      return cachedData; // Trả về dữ liệu từ cache
    }
    const queryBuilder = await this.repository.createQueryBuilder();
    if (name) {
      // Đảm bảo truyền giá trị name vào một cách an toàn
      queryBuilder.where(
        `
            MATCH (ingredient.name) AGAINST (:name IN BOOLEAN MODE)
            `,
        { name: `*${name}*` }
      );
    }
    if (orderBy) {
      const sortOrder = sort == TypeSort.ASC ? "ASC" : "DESC";
      queryBuilder.orderBy(`ingredient.${orderBy}`, sortOrder);
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
  protected async unique(data: DeepPartial<Ingredient>) {
    const record = await (
      await this.repository.getBy(data.name, "name")
    ).getOne();
    if (record) {
      return record;
    }
  }
  protected async validate(
    id: number,
    data: DeepPartial<Ingredient>
  ): Promise<void> {
    const record = await this.unique(data);
    if (record && record.id !== id) {
      throw new CustomError(
        `Tên nguyên liệu này đã tồn tại name = ${record.name}`,
        400,
        "name"
      );
    }
  }
  async create(data: any): Promise<void | Ingredient> {
    await this.validate(0, data);
    await this.deleteCacheFilter();
    await this.repository.create(data);
  }
  async getById(value: number): Promise<Ingredient> {
    const cacheKey = `ingredient-${value}`;
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
    await super.removeArray(ids);
  }
}
