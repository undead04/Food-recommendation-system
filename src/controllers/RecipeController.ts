import { Response } from "express";
import BaseController from "../utils/BaseController";
import RecipeService from "../services/RecipeService";
import AppRole from "../models/modelRequest/AppRole";
import { RecipeModel } from "../models/modelRequest/RecipeModel";
import validateError from "../Middlewares/ValidateErrorDTO";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { Recipe } from "../entitys/Recipe";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { RecipeIngredient } from "entitys/Recipe_Ingredient";
import {
  Body,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Route,
  Security,
  Tags,
} from "tsoa";
import { recipeFilterModel } from "../models/modelRequest/FilterModel";
@Route("/recipe")
@Tags("Recipe")
export class RecipeController extends BaseController<RecipeService> {
  constructor() {
    const recipeService = new RecipeService();
    super(recipeService);
  }
  @Get("/")
  /**
   * filter đồ ăn theo nguyên liệu và thể loại
   */
  async getFilter(@Queries() filter: recipeFilterModel) {
    return await super.getFilter(filter);
  }
  /**
   * @example{
  "name": "Spaghetti Bolognese",
  "description": "A classic Italian pasta dish with a rich and savory meat sauce.",
  "instructions": "1. Cook spaghetti according to package instructions. 2. In a large pan, sauté onions and garlic. 3. Add ground beef and cook until browned. 4. Stir in tomato sauce, herbs, and spices. 5. Simmer for 30 minutes. 6. Serve sauce over spaghetti.",
  "imageUrl": "https://example.com/spaghetti-bolognese.jpg",
  "categoryId": [1, 2],
  "regionId": 3,
  "recipeIngredient": [
    {
      "ingredientId": 101,
      "quantity": 500,
      "unit": "grams"
    },
    {
      "ingredientId": 102,
      "quantity": 1,
      "unit": "piece"
    },
    {
      "ingredientId": 103,
      "quantity": 2,
      "unit": "cloves"
    }
  ],
  "timeCook": 45,
  "spice_level": 2,
  "sweetness_level": 1,
  "saltiness_level": 3
}
   */
  @Post("/")
  @Middlewares([validateError(RecipeModel), validateError(RecipeIngredient)])
  @Security("JWT", [`${AppRole.Admin}`])
  async create(@Body() data: RecipeModel) {
    return await super.create(data);
  }

  // UPDATE - Cập nhật bản ghi
  /**
   * @example{
  "name": "Spaghetti Bolognese",
  "description": "A classic Italian pasta dish with a rich and savory meat sauce.",
  "instructions": "1. Cook spaghetti according to package instructions. 2. In a large pan, sauté onions and garlic. 3. Add ground beef and cook until browned. 4. Stir in tomato sauce, herbs, and spices. 5. Simmer for 30 minutes. 6. Serve sauce over spaghetti.",
  "imageUrl": "https://example.com/spaghetti-bolognese.jpg",
  "categoryId": [1, 2],
  "regionId": 3,
  "recipeIngredient": [
    {
      "ingredientId": 101,
      "quantity": 500,
      "unit": "grams"
    },
    {
      "ingredientId": 102,
      "quantity": 1,
      "unit": "piece"
    },
    {
      "ingredientId": 103,
      "quantity": 2,
      "unit": "cloves"
    }
  ],
  "timeCook": 45,
  "spice_level": 2,
  "sweetness_level": 1,
  "saltiness_level": 3
}
  @example id 1
   */
  @Put("{id}")
  @Middlewares([
    notFound(Recipe, "recipe"),
    validateError(RecipeModel),
    validateError(RecipeIngredient),
  ])
  @Security("JWT", [`${AppRole.Admin}`])
  async update(@Path("id") id: number, @Body() data: RecipeModel) {
    return await super.update(id, data);
  }
  /**
   * Lấy một dữ liệu đồ ăn
   * @param id id của đồ ăn
   * @example id 1
   * @returns trả về một món ăn
   */
  @Get("{id}")
  async getOne(@Path("id") id: number) {
    return await super.getOne(id);
  }
  /**
   *Xóa một dồ ăn
   * @param id id của đồ ăn
   * @example id 1
   * @returns xóa một món ăn trong danh sách
   */
  @Delete("{id}")
  @Security("JWT", [`${AppRole.Admin}`])
  async delete(@Path("id") id: number) {
    return await super.delete(id);
  }
  @Delete("/")
  @Middlewares([notFoundArray(Recipe, "recipe"), validateError(DeleteModel)])
  @Security("JWT", [`${AppRole.Admin}`])
  async deleteArray(@Body() data: DeleteModel) {
    return await super.deleteArray(data);
  }
}
