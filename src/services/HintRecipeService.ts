import {
  filterHintRecipe,
  filterPagination,
  HintIngredient,
} from "models/modelRequest/FilterModel";
import { Recipe } from "../entitys/Recipe";
import { User } from "../entitys/User";
import BaseRepository, { IPagination } from "../utils/BaseRepository";

export default class HintRecipeService {
  protected repository = new BaseRepository(Recipe, "recipe");
  protected userRepository = new BaseRepository(User, "user");
  async getHintIngredient(filter: HintIngredient) {
    const { ingredientIds, userId, page, pageSize } = filter;
    const ingredientIdsArray = ingredientIds.split(",");
    const query = await (await this.repository.createQueryBuilder())
      .innerJoin("recipe.recipeIngredients", "recipeIngredient")
      .innerJoin("recipeIngredient.ingredient", "ingredient")
      .select([
        "recipe.name as name",
        "recipe.id as id",
        "recipe.imageUrl as imageUrl",
      ]);

    await query
      .addSelect([
        `COUNT(recipeIngredient.id) AS priorityLevel`,
        `COUNT(*) OVER() AS total`, // Tính tổng số kết quả trong cùng truy vấn
      ])
      .andWhere("recipeIngredient.ingredientId IN (:...ingredientIds)", {
        ingredientIds: ingredientIdsArray,
      })
      .groupBy("recipe.id")
      .having("priorityLevel/COUNT(recipeIngredient.id) >= :min", { min: 0.5 })
      .orderBy("priorityLevel", "DESC");
    if (userId) {
      const user = await (await this.userRepository.getBy(userId))
        .leftJoinAndSelect("user.region", "region")
        .getOne();
      query
        .addSelect([
          `(
                CASE 
                WHEN recipe.regionId = ${user.region.id} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.sweetness_level = ${user.sweetness_preference} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.saltiness_level = ${user.saltiness_preference} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.spice_level = ${user.spice_preference} THEN 1 ELSE 0 
                END
            ) AS suitabilityScore`,
        ])
        .addOrderBy("suitabilityScore", "DESC");
    }
    const recipes = await query
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();

    // Lấy `total` từ kết quả
    const total = recipes.length > 0 ? recipes[0].total : 0;
    const data: IPagination<any> = {
      records: recipes,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
    return data;
  }
  async getHintUser(filter: filterHintRecipe) {
    const { userId, page, pageSize } = filter;
    const user = await (await this.userRepository.getBy(userId))
      .leftJoinAndSelect("user.region", "region")
      .getOne();
    const recipes = await (
      await this.repository.createQueryBuilder()
    )
      .select([
        "recipe.name as name",
        "recipe.id as id",
        "recipe.imageUrl as imageUrl",
      ])
      .addSelect([
        // Tính toán suitabilityScore (điểm độ phù hợp với sở thích người dùng)
        `(
                CASE 
                WHEN recipe.regionId = ${user.region.id} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.sweetness_level = ${user.sweetness_preference} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.saltiness_level = ${user.saltiness_preference} THEN 1 ELSE 0 
                END + 
                CASE 
                WHEN recipe.spice_level = ${user.spice_preference} THEN 1 ELSE 0 
                END
            ) AS suitabilityScore`,
        "COUNT(*) OVER() as total",
      ])
      .groupBy("recipe.id")
      .addOrderBy("suitabilityScore", "DESC") // Sắp xếp theo suitabilityScore
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();
    // Lấy `total` từ kết quả
    const total = recipes.length > 0 ? recipes[0].total : 0;
    const data: IPagination<any> = {
      records: recipes,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
    return data;
  }
  async getHintSimilar(recipeId: number, filter: filterPagination) {
    const { page, pageSize } = filter;
    const recipe = await (await this.repository.createQueryBuilder())
      .innerJoinAndSelect("recipe.recipeIngredients", "recipeIngredient")
      .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
      .innerJoinAndSelect("recipe.region", "region")
      .andWhere("recipe.id =:recipeId", { recipeId })
      .getOne();
    const ingredientIds = recipe.recipeIngredients.map(
      (recipeIngredient) => recipeIngredient.ingredient.id
    );
    const recipes = await (
      await this.repository.createQueryBuilder()
    )
      .innerJoin("recipe.recipeIngredients", "recipeIngredient")
      .select([
        "recipe.name as name",
        "recipe.id as id",
        "recipe.imageUrl as imageUrl",
      ])
      .addSelect([
        // Tính toán priorityLevel (số lượng nguyên liệu phù hợp)
        `COUNT(recipeIngredient.id) AS priorityLevel`,
        // Tính toán suitabilityScore (điểm độ phù hợp với sở thích người dùng)
        `(
            CASE 
            WHEN recipe.regionId = ${recipe.region.id} THEN 1 ELSE 0 
            END + 
            CASE 
            WHEN recipe.sweetness_level = ${recipe.sweetness_level} THEN 1 ELSE 0 
            END + 
            CASE 
            WHEN recipe.saltiness_level = ${recipe.saltiness_level} THEN 1 ELSE 0 
            END + 
            CASE 
            WHEN recipe.spice_level = ${recipe.spice_level} THEN 1 ELSE 0 
            END
        ) AS suitabilityScore`,
        "COUNT(*) OVER() as total",
      ])
      .andWhere("recipeIngredient.ingredientId IN (:...ingredientIds)", {
        ingredientIds,
      })
      .andWhere("recipe.id != :recipeId", { recipeId })
      .groupBy("recipe.id")
      .addOrderBy("suitabilityScore", "DESC") // Sắp xếp theo suitabilityScore
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();
    const total = recipes.length > 0 ? recipes[0].total : 0;
    const data: IPagination<any> = {
      records: recipes,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
    return data;
  }
  async getHighlyAppreciated(filter: filterPagination) {
    const { page, pageSize } = filter;
    const records = await (
      await this.repository.createQueryBuilder()
    )
      .leftJoinAndSelect("recipe.ratings", "rating")
      .select([
        "recipe.name as name",
        "recipe.id as id",
        "recipe.imageUrl as imageUrl",
      ])
      .addSelect([
        "AVG(rating.rate) as rate",
        "LOG(COUNT(rating.id) + 1) as ratingsLog", // Để tính log một cách rõ ràng
        "ROUND(AVG(rating.rate) * LOG(COUNT(rating.id) + 1), 1) AS popularityScore", // Làm tròn đến 1 chữ số thập phân
        "COUNT(*) OVER() as total",
      ])
      .groupBy("recipe.id")
      .having("rate >= :minRate", { minRate: 4 })
      .orderBy("popularityScore", "DESC") // Sắp xếp theo popularityScore
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .getRawMany();

    const total = records.length > 0 ? records[0].total : 0;
    const data: IPagination<any> = {
      records: records,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };

    return data;
  }
}
