import BaseController from "../utils/BaseController";
import IngredientService from "../services/IngredientService";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import { IngredientModel } from "../models/modelRequest/IngredientModel";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { Ingredient } from "../entitys/Ingredient";
import {
  Body,
  Delete,
  Example,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Queries,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { IngredientFilter } from "../models/modelRequest/FilterModel";
@Route("/ingredient")
@Tags("Ingredient")
export class IngredientController extends BaseController<IngredientService> {
  constructor() {
    const service = new IngredientService();
    super(service);
  }

  // READ - Lấy danh sách bản ghi
  /**
   *
   * @param filter filter theo tên ,phân trang,và sort
   * @returns trả về một danh sách món ăn
   */
  @Get("/")
  async getFilter(@Queries() filter: IngredientFilter) {
    return await super.getFilter(filter);
  }
  @Post("/")
  /**
   * Tạo nguyên liệu mới
   * @example{
   * "name":"ca rot",
   * "imageUrl":"carrot.png"
   * }
   */
  @Security("JWT", [`${AppRole.Admin}`])
  @Middlewares([validateError(IngredientModel)])
  async create(@Body() data: IngredientModel) {
    return await super.create(data);
  }

  // UPDATE - Cập nhật bản ghi
  /**
   *Cập nhập nguyên liệu
   * @param id là id của nguyên liêu
   * @param data dữ liệu nguyên liệu cập nhập
   * @returns cập nhập thông tin của nguyên liệu
   * @example id 1
   * @example{
   * "name":"ca rot",
   * "imageUrl":"carrot.png"
   * }
   */
  @Put("{id}")
  @Middlewares([
    notFound(Ingredient, "ingredient"),
    validateError(IngredientModel),
  ])
  @Security("JWT", [`${AppRole.Admin}`])
  async update(@Path("id") id: number, @Body() data: IngredientModel) {
    return await super.update(id, data);
  }
  @Get("{id}")
  /**
   * @example id 1
   */
  async getOne(@Path("id") id: number) {
    return await super.getOne(id);
  }
  /**
   * Xóa bản ghi
   * @param id id của nguyên liệu
   * @example id 1
   * @returns xóa nguyên liệu khỏi danh sách
   */
  @Delete("{id}")
  @Security("JWT", [`${AppRole.Admin}`])
  async delete(@Path("id") id: number) {
    return await super.delete(id);
  }
  @Delete("/")
  @Security("JWT", [`${AppRole.Admin}`])
  /**
   * Xóa danh sách bản ghi
   *
   * @example{
   * "ids":[1,2,3]
   * }
   */
  @Middlewares([
    notFoundArray(Ingredient, "ingredient"),
    validateError(DeleteModel),
  ])
  async deleteArray(@Body() data: DeleteModel) {
    return await super.deleteArray(data);
  }
}
