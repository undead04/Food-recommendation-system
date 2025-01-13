import { DeepPartial } from "typeorm";
import BaseRepository, { IPagination } from "../utils/BaseRepository";
import CustomError from "../utils/CustumError";
import { dataSource } from "../config/dataSource";
import { RecipeUser } from "../entitys/Recipe_User";
import { FavouriteFilter, TypeSort } from "models/modelRequest/FilterModel";

export default class FavouriteService {
  protected repository = new BaseRepository(RecipeUser, "recipeUser");
  async getFillter(filter: FavouriteFilter): Promise<IPagination<RecipeUser>> {
    const { userId, name, page, pageSize, orderBy, sort } = filter;
    const queryBuilder = await (await this.repository.createQueryBuilder())
      .leftJoinAndSelect("recipeUser.recipe", "recipe")
      .andWhere("recipeUser.userId=:userId", { userId });
    if (name) {
      // Đảm bảo truyền giá trị name vào một cách an toàn
      queryBuilder.andWhere(
        `
                MATCH (recipe.name) AGAINST (:name IN BOOLEAN MODE)
            `,
        { name: `*${name}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `recipeUser.${orderBy}`,
        sort == TypeSort.ASC ? "ASC" : "DESC"
      );
    }
    const data = await this.repository.getPagination(
      queryBuilder,
      page,
      pageSize
    );
    return data;
  }
  protected async validateBase(id: number) {
    const records = await (await this.repository.getBy(id)).getOne();
    if (records == null) {
      throw new CustomError(
        `Không tồn tại id = ${id} trong bản thể loại này`,
        404
      );
    }
    return records;
  }
  protected async unique(data: DeepPartial<RecipeUser>) {
    const record = await (await this.repository.getBy(data.recipe.id))
      .andWhere("recipeUser.userId=:userId", { userId: data.user.id })
      .getOne();
    if (record) {
      return record;
    }
  }
  async validate(data: DeepPartial<RecipeUser>): Promise<void> {
    const record = await this.unique(data);
    if (record) {
      throw new CustomError(
        `Mốn ăn này đã tồn tại troong sở thích`,
        400,
        "name"
      );
    }
  }
  async getById(id: number) {
    const record = await this.validateBase(id);
    return record;
  }
  async create(data: DeepPartial<RecipeUser>) {
    await this.validate(data);
    await this.repository.create(data);
  }
  protected async validateRemove(id: number, userId: number) {
    const record = await (await this.repository.getBy(id))
      .leftJoinAndSelect("recipeUser.user", "user")
      .getOne();
    if (record == null) {
      throw new CustomError("Không tìm thấy yêu thích này", 404);
    }
    if (record.user.id !== userId) {
      throw new CustomError(
        "Bạn không có thẩm quyền để xóa món ăn yêu thích này",
        403
      );
    }
    return record;
  }
  async remove(id: number, userId: number): Promise<void> {
    const record = await this.validateRemove(id, userId);
    return this.repository.remove(record);
  }

  async removeArray(ids: number[], userId: number): Promise<void> {
    await Promise.all(
      ids.map(async (id) => await this.validateRemove(id, userId))
    );
    await dataSource.manager.transaction(async (transactionEntityManager) => {
      await this.repository.removeArray(ids, transactionEntityManager);
    });
  }
}
