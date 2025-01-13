import { RepositoryDTO } from "../utils/ReponseDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import FavouriteService from "../services/FavouriteService";
import { FavouriteModel } from "../models/modelRequest/FavouriteModel";
import validateError from "../Middlewares/ValidateErrorDTO";
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Route,
  Security,
  Tags,
  Request,
  Queries,
} from "tsoa";
import AppRole from "models/modelRequest/AppRole";
import BaseController from "utils/BaseController";
import {
  FavouriteFilter,
  FavouriteFilterRequest,
} from "../models/modelRequest/FilterModel";
@Route("/favourite")
@Tags("favourite")
export class FavouriteController extends Controller {
  protected service: FavouriteService;
  protected baseController: BaseController<FavouriteService>;
  constructor() {
    super();
    this.service = new FavouriteService();
    this.baseController = new BaseController(this.service);
  }
  @Post("/")
  /**
   * Thêm  đồ ăn vào danh sách yếu thích
   * @example {
   *  "recipeId": 1,
   * }
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  @Middlewares([validateError(FavouriteModel)])
  async create(@Request() req: any, @Body() model: FavouriteModel) {
    const user = req.user;
    return await this.baseController.create({
      user: { id: user.id },
      recipe: { id: model.recipeId },
    });
  }
  /**
   *
   * @param id là id của danh sách yêu thích
   * @param req
   * @example id 1
   * @returns Xóa đồ khỏi danh sách yêu thích
   */
  @Delete("{id}")
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async remove(@Path("id") id: number, @Request() req: any) {
    try {
      const user = req.user;
      await this.service.remove(id, user.id);
      return RepositoryDTO.Success(
        "Xóa ra khỏi danh sách đồ ăn yêu thích thành công",
        200
      );
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  /**
   *
   * @param req
   * @example{
   * "ids":[1,2,3]
   * }
   * @returns Xóa đồ ăn khỏi danh sách yêu thích
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  @Middlewares(validateError(DeleteModel))
  @Delete("/")
  async removeArray(@Request() req: any, @Body() model: DeleteModel) {
    try {
      const user = req.user;
      await this.service.removeArray(model.ids, user.id);
      return RepositoryDTO.Success(
        "Xóa ra khỏi danh sách đồ ăn yêu thích thành công",
        200
      );
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  @Get("/")
  /**
   * filter lấy đồ ăn đã đc người dùng yêu thích
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async getFilter(
    @Request() req: any,
    @Queries() filter?: FavouriteFilterRequest
  ) {
    const user = req.user;
    const favouriteFilter: FavouriteFilter = {
      ...filter,
      userId: user.id,
    };
    return await this.baseController.getFilter(favouriteFilter);
  }
}
