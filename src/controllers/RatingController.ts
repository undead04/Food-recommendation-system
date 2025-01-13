import BaseController from "../utils/BaseController";
import AppRole from "../models/modelRequest/AppRole";
import validateError from "../Middlewares/ValidateErrorDTO";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
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
  Request,
  Controller,
} from "tsoa";
import { Rating } from "../entitys/Rating";
import RatingService from "services/RatingService";
import { RatingRequest } from "../models/modelRequest/RatingModel";
import { RatingFilter } from "../models/modelRequest/FilterModel";
@Route("/rating")
@Tags("Rating")
export class RatingController extends Controller {
  private service = new RatingService();
  private controller = new BaseController(this.service);
  /**
   *Lọc rating  tên,page,pagesize,với sắp xếp
   */
  @Get("/")
  async getFilter(@Queries() filter: RatingFilter) {
    return await this.controller.getFilter(filter);
  }
  @Post("/")
  /**
   * Bình luận về đồ ăn
   * @example {
   *  "comment": "Đồ ăn ngon",
   * "rate":5,
   * "recipeId":1
   * }
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  @Middlewares([validateError(RatingRequest)])
  @SuccessResponse(201, "Create")
  async create(@Body() data: RatingRequest, @Request() req: any) {
    const user = req.user;
    return await this.controller.create({ ...data, userId: user.id });
  }

  @Get("{id}")
  /**
   * Lấy một bản ghi thể loại đồ ăn
   * @example id 1
   */
  async getOne(@Path() id: number) {
    return await this.controller.getOne(id);
  }
  @Get("/getRatingMe/{recipeId}")
  /**
   *Lấy bình luận của người dùng
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async getRatingMe(@Path() recipeId: number, @Request() req: any) {
    const user = await req.user;
    const data = await this.service.getRatingMe(user.id, recipeId);
    return this.controller.sendResponse(data);
  }
  // UPDATE - Cập nhật bản ghi
  @Put("{id}")
  /**
   * Cập nhập thể loại
   * @example id "1"
   * @example {
   *  "comment": "Đồ ăn ngon",
   *  "rate":5,
   *  "recipeId":1
   * }
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  @Middlewares([notFound(Rating, "rating"), validateError(RatingRequest)])
  async update(
    @Path() id: number,
    @Body() data: RatingRequest,
    @Request() req: any
  ) {
    const user = req.user;
    return await this.controller.update(id, { data, userId: user.id });
  }

  @Delete("{id}")
  @SuccessResponse(204, "No content")
  /**
   * Xóa một thể loại
   * @example id 1
   */
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async delete(@Path() id: number, @Request() req: any) {
    try {
      const user = req.user;
      await this.service.validateRemove(id, user.id);
      await this.service.remove(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @SuccessResponse(204, "No content")
  @Security("JWT", [`${AppRole.Admin}`])
  @Delete("/")
  @Middlewares([notFoundArray(Rating, "rating"), validateError(DeleteModel)])
  /**
   * Xóa một mảng thể loại
   * @example{
   * "ids":[1,2,3]
   * }
   */
  async deleteArray(@Body() data: DeleteModel) {
    return await this.controller.deleteArray(data);
  }
}
