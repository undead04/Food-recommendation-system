import { Response } from "express";
import BaseController from "../utils/BaseController";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import UserService from "../services/UserService";
import AppRole from "../models/modelRequest/AppRole";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { statusUser, User } from "../entitys/User";
import validateError from "../Middlewares/ValidateErrorDTO";
import { PasswordModel, UserModel } from "../models/modelRequest/UserModel";
import {
  Body,
  Delete,
  Get,
  Middlewares,
  Path,
  Request,
  Put,
  Queries,
  Route,
  Security,
  Tags,
} from "tsoa";
import { userFilterModel } from "../models/modelRequest/FilterModel";
@Route("/user")
@Tags("User")
export class UserController extends BaseController<UserService> {
  constructor() {
    const service = new UserService();
    super(service);
  }
  @Delete("/")
  @Middlewares([notFoundArray(User, "user"), validateError(DeleteModel)])
  @Security("JWT", [`${AppRole.Admin}`])
  async deleteArray(@Body() data: DeleteModel) {
    return await super.deleteArray(data);
  }
  @Get("/getMe")
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async getMe(@Request() req: any) {
    try {
      const user = req.user;
      const record = await this.service.getById(user.id);
      return this.sendResponse(record);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  @Put("/password")
  @Middlewares(validateError(PasswordModel))
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async updatePassword(@Request() req: any, @Body() data: PasswordModel) {
    try {
      const user = req.user;
      await this.service.updatePassword(user, data);
      return this.sendSuccess("Cập nhập mật khẩu thành công", 200);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  @Get("{id}")
  @Security("JWT", [`${AppRole.Admin}`])
  async getOne(@Path("id") id: number) {
    return await super.getOne(id);
  }
  @Get("/")
  @Security("JWT", [`${AppRole.Admin}`])
  async getFilter(@Queries() filter: userFilterModel) {
    return await super.getFilter(filter);
  }
  @Put("{id}")
  @Middlewares(notFound(User, "user"))
  async banUser(@Path("id") id: number) {
    return await super.update(id, { status: statusUser.ban });
  }
  @Put("/")
  @Middlewares(validateError(UserModel))
  @Security("JWT", [`${AppRole.Admin}`, `${AppRole.User}`])
  async updateUser(@Request() req: any, @Body() data: UserModel) {
    const id = req._id;
    return await super.update(id, {
      spice_preference: data.spice_preference,
      sweetness_preference: data.sweetness_preference,
      saltiness_preference: data.saltiness_preference,
      description: data.description,
      region: { id: data.regionId },
    });
  }

  @Delete("{id}")
  @Security("JWT", [`${AppRole.Admin}`])
  async delete(@Path("id") id: number) {
    return await super.delete(id);
  }
  @Delete("/getMe")
  @Security("JWT", [`${AppRole.Admin}`])
  async deleteMe(@Request() req: any) {
    const user = req.user;
    return await super.delete(user.id);
  }
}
