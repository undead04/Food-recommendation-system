import BaseController from "../utils/BaseController";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import CategoryService from "../services/CategoryService";
import { CategoryModel } from "../models/modelRequest/CategoryModel";
import { Category } from "../entitys/Category";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
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
  SuccessResponse,
  Tags,
} from "tsoa";
import { CategoryFilter } from "../models/modelRequest/FilterModel";
@Route("/category")
@Tags("Category")
export class CategoryController extends BaseController<CategoryService> {
  constructor() {
    const service = new CategoryService();
    super(service);
  }
  /**
   *Lọc thể loại đồ ăn thêm tên,page,pagesize,với sắp xếp
   */
  @Get("/")
  async getFilter(@Queries() filter: CategoryFilter) {
    return await super.getFilter(filter);
  }
  @Post("/")
  /**
   * Thêm dữ liệu thể loại đồ ăn
   * @example {
   *  "name": "Đồ ăn ngon",
   * }
   */
  @Security("JWT", [`${AppRole.Admin}`])
  @Middlewares([validateError(CategoryModel)])
  @SuccessResponse(201, "Create")
  async create(@Body() data: CategoryModel) {
    return await super.create(data);
  }

  @Get("{id}")
  /**
   * Lấy một bản ghi thể loại đồ ăn
   * @example id "1"
   */
  async getOne(@Path() id: number) {
    return await super.getOne(id);
  }

  // UPDATE - Cập nhật bản ghi
  @Put("{id}")
  /**
   * Cập nhập thể loại
   * @example id "1"
   * @example {
   * "name": "Đồ ăn ngon",
   *}
   */
  @Security("JWT", [`${AppRole.Admin}`])
  @Middlewares([notFound(Category, "category"), validateError(CategoryModel)])
  async update(@Path() id: number, @Body() data: CategoryModel) {
    return await super.update(id, data);
  }

  @Delete("{id}")
  @SuccessResponse(204, "No content")
  /**
   * Xóa một thể loại
   * @example id 1
   */
  @Security("JWT", [`${AppRole.Admin}`])
  async delete(@Path() id: number) {
    return await super.delete(id);
  }
  @SuccessResponse(204, "No content")
  @Security("JWT", [`${AppRole.Admin}`])
  @Delete("/")
  @Middlewares([
    notFoundArray(Category, "category"),
    validateError(DeleteModel),
  ])
  /**
   * Xóa một mảng thể loại
   * @example{
   * "ids":[1,2,3]
   * }
   */
  async deleteArray(@Body() data: DeleteModel) {
    return await super.deleteArray(data);
  }
}
