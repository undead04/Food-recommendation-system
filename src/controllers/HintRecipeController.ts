import HintRecipeService from "../services/HintRecipeService";
import { RepositoryDTO } from "../utils/ReponseDTO";
import { notFound } from "../Middlewares/NotFoundHandle";
import { Recipe } from "../entitys/Recipe";
import CustomError from "utils/CustumError";
import {
  Controller,
  Get,
  Middlewares,
  Path,
  Queries,
  Route,
  Security,
  Tags,
  Request,
} from "tsoa";
import AppRole from "../models/modelRequest/AppRole";
import {
  filterPagination,
  HintIngredient,
  HintIngredientFilterRequest,
} from "../models/modelRequest/FilterModel";
@Route("/hint")
@Tags("Hint Recipe")
export class HintRecipeController extends Controller {
  protected service = new HintRecipeService();
  /**
   * lọc theo nguyên liệu và sợ thích của người dùng
   */
  @Get("/ingredient")
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async getHintIngredient(
    @Queries() filter: HintIngredientFilterRequest,
    @Request() req: any
  ) {
    const user = req.user;
    if (!filter.ingredientIds) {
      throw new CustomError("Bắt buộc phải có ingredientIds", 400);
    }
    const hintIngredientFilter: HintIngredient = {
      ...filter,
      userId: user.id,
    };
    const data = await this.service.getHintIngredient(hintIngredientFilter);
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
  /**
   *
   * @param filter thông tin muốn lọc
   *
   * Tìm kiếm theo nguyên liệu như theo kiểu public ai sài cũng đc dùng co tài khoản gust
   * @returns Tìm kiếm theo nguyên liệu như theo kiểu public ai sài cũng đc dùng co tài khoản gust
   */
  @Get("/ingredient/public")
  async getHintIngredientPublic(
    @Queries() filter: HintIngredientFilterRequest
  ) {
    if (!filter.ingredientIds) {
      throw new CustomError("Bắt buộc phải có ingredientIds", 400);
    }
    const hintIngredientFilter: HintIngredient = {
      ...filter,
    };
    const data = await this.service.getHintIngredient(hintIngredientFilter);
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
  @Get("/recipeUser")
  /**
   * Gợi ý đồ ăn theo sở thích của người dung
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async getHintUser(@Queries() filter: filterPagination, @Request() req: any) {
    const user = req.user;
    const data = await this.service.getHintUser({ userId: user.id, ...filter });
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
  /**
   *
   * @param filter filter page pagesize cho món ăn tương tự
   * @example id 1
   * @returns Lấy món ăn tương tự với id trên
   */
  @Get("/recipeSimilar/{id}")
  @Middlewares(notFound(Recipe, "recipe"))
  async getHintSimilar(
    @Path("id") id: number,
    @Queries() filter?: filterPagination
  ) {
    const data = await this.service.getHintSimilar(id, filter);
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
  @Get("/recipeHightly")
  /**
   * Lấy đồ ăn có đánh giá cao nhất
   */
  async getHighlyAppreciated(@Queries() filter: filterPagination) {
    const data = await this.service.getHighlyAppreciated(filter);
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
}
