import { DeepPartial } from "typeorm";
import BaseRepository, { IPagination } from "../utils/BaseRepository";
import BaseService from "../utils/BaseService";
import CustomError from "../utils/CustumError";
import { Rating } from "entitys/Rating";
import { RatingModel } from "models/modelRequest/RatingModel";
import { User } from "entitys/User";
import AppRole from "models/modelRequest/AppRole";
import { RatingFilter, TypeSort } from "models/modelRequest/FilterModel";

export default class RatingService extends BaseService<Rating> {
  protected userRepo = new BaseRepository(User, "user");
  constructor() {
    super(Rating, "rating");
  }
  transfromDTO(data: Partial<RatingModel>): DeepPartial<Rating> {
    return {
      user: { id: data.userId },
      rate: data.rate,
      comment: data.comment,
      recipe: { id: data.recipeId },
    };
  }
  protected async unique(data: DeepPartial<Rating>) {
    const record = await (await this.repository.createQueryBuilder())
      .andWhere("rating.userId =: userId", { userId: data.user.id })
      .andWhere("rating.recipeId=:recipeId", { recipeId: data.recipe.id })
      .getOne();
    if (record) {
      return record;
    }
  }
  protected async isNotFound(id: number): Promise<Rating> {
    const reocrd = await (await this.repository.getBy(id)).getOne();
    if (reocrd == null) {
      throw new CustomError("Không tìm thấy rating nay", 404);
    }
    return reocrd;
  }
  protected async validate(
    id: number,
    data: DeepPartial<Rating>
  ): Promise<void> {
    const record = await this.unique(data);
    if (record && record.id !== id) {
      throw new CustomError(`Món ăn này bạn đã đánh giá rồi`, 400);
    }
  }
  async getRatingMe(userId: number, recipeId: number) {
    const record = await (await this.repository.createQueryBuilder())
      .leftJoinAndSelect("rating.user", "user")
      .andWhere("rating.userId =:userId", { userId })
      .andWhere("rating.recipeId =:recipeId", { recipeId })
      .getOne();
    if (record == null) {
      throw new CustomError("Không tìm thấy bình luận này", 404);
    }
    return userId;
  }

  async getFilter(filter: RatingFilter): Promise<IPagination<Rating>> {
    const { recipeId, star, page, pageSize, userId, orderBy, sort } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (recipeId) {
      // Đảm bảo truyền giá trị name vào một cách an toàn
      queryBuilder.andWhere("rating.recipeId =:recipeId", { recipeId });
    }
    if (star) {
      queryBuilder.andWhere("rating.rate =:rate", { rate: star });
    }
    if (userId) {
      queryBuilder.andWhere("rating.userId =:userId", { userId });
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `rating.${orderBy}`,
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
  async validateRemove(id: number, userId: number) {
    const user = await (await this.userRepo.getBy(userId))
      .innerJoinAndSelect("user.groupRole", "groupRole")
      .getOne();
    if (user.groupRole.name === AppRole.User) {
      const record = await (await this.repository.getBy(id))
        .andWhere("rating.userId=:userId", { userId })
        .getOne();
      if (!record) {
        throw new CustomError(
          "Bạn không đủ quyền hạn để xóa đánh giá này",
          403
        );
      }
    }
  }
}
