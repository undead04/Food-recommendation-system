import { DeepPartial } from "typeorm";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { Region } from "../entitys/Region";
import { redisCache } from "config/dataSource";

export default class RegionService extends BaseService<Region> {
  constructor() {
    super(Region, "region");
  }
  protected async isNotFound(id: number): Promise<Region> {
    const record = await (await this.repository.getBy(id)).getOne();
    if (record == null) {
      throw new CustomError(`Không tồn tại quốc gia này id = ${id}`, 404);
    }
    return record;
  }
  protected async deleteCacheId(id: number) {
    const cacheKey = `region-${id}`;
    const cacheData = await redisCache.get(cacheKey);
    if (cacheData) {
      await redisCache.del(cacheKey);
      console.log("Remove cache");
    }
  }
  protected async deleteCacheFilter() {
    await redisCache.clearCacheByPattern("region-filter-*");
    console.log("Delete Cache Filter");
  }
  protected async unique(data: DeepPartial<Region>) {
    const record = await (
      await this.repository.getBy(data.name, "name")
    ).getOne();
    if (record) {
      return record;
    }
  }
  protected async validate(
    id: number,
    data: DeepPartial<Region>
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
  async getFilter(): Promise<Region[]> {
    // Tạo một khóa cache duy nhất không bao gồm name
    const cacheKey = "region-all";
    // Kiểm tra nếu có cache trước
    const cachedData = await redisCache.get(cacheKey);
    if (cachedData) {
      console.log("Data from cache");
      return cachedData; // Trả về dữ liệu từ cache
    }
    const queryBuilder = await (await this.repository.createQueryBuilder())
      .select(["region.id", "region.name"])
      .limit(10);
    const data = await queryBuilder.getMany();
    await redisCache.set("region-all", data);
    return data;
  }
}
