import { statusUser, User } from "../entitys/User";
import BaseService from "../utils/BaseService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { DeepPartial } from "typeorm";
import BaseRepository from "../utils/BaseRepository";
import { GroupRole } from "../entitys/GroupRole";
import AppRole from "../models/modelRequest/AppRole";
import CustomError from "../utils/CustumError";
import { LoginModel, PasswordModel } from "../models/modelRequest/UserModel";
import { TypeSort, userFilterModel } from "models/modelRequest/FilterModel";
export default class UserService extends BaseService<User> {
  protected groupRoleRepo = new BaseRepository(GroupRole, "groupRole");
  constructor() {
    super(User, "user");
  }
  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // Băm mật khẩu với salt
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  protected async comparePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
  protected async isNotFound(id: number): Promise<User> {
    const record = await (await this.repository.getBy(id)).getOne();
    if (record == null) {
      throw new CustomError("Không tìm thấy người dùng này", 404);
    }
    return record;
  }
  async createAccessToken(user: any) {
    return jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      "accessToken",
      { expiresIn: "15m" }
    );
  }
  async createRefreshToken(user: any) {
    return jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      "refreshToken",
      { expiresIn: "7d" }
    );
  }
  async isLogin(model: LoginModel) {
    const record = await (
      await this.repository.getBy(model.username, "username")
    )
      .innerJoinAndSelect("user.groupRole", "groupRole")
      .select([
        "user.id",
        "user.username",
        "user.password",
        "groupRole.name",
        "user.status",
      ])
      .getOne();
    if (record == null) {
      return null;
    }
    const isMatch = await this.comparePassword(model.password, record.password);
    if (!isMatch) return null;
    return record;
  }

  protected async uniqueName(data: DeepPartial<User>) {
    const records = await (
      await this.repository.getBy(data.username, "username")
    ).getOne();
    if (records) {
      return records;
    }
  }
  protected async validate(id: number, data: DeepPartial<User>): Promise<void> {
    const records = await this.uniqueName(data);
    if (records && records.id !== id) {
      throw new CustomError(`Tên người dùng này đã tồn tại`, 400, "username");
    }
  }
  async getFilter(filter: userFilterModel) {
    const { username, sort, orderBy, page, pageSize } = filter;
    const queryBuilder = await this.repository.createQueryBuilder();
    if (username) {
      queryBuilder.where(
        `
                MATCH (user.username) AGAINST (:name IN BOOLEAN MODE)
            `,
        { name: `*${username}*` }
      );
    }
    if (orderBy) {
      queryBuilder.orderBy(
        `user.${orderBy}`,
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
  async create(data: DeepPartial<User>): Promise<User | void> {
    const role = await (
      await this.groupRoleRepo.getBy(AppRole.User, "name")
    ).getOne();
    const hashPassword = await this.hashPassword(data.password);
    return await super.create({
      ...data,
      password: hashPassword,
      groupRole: { id: role.id },
    });
  }
  async update(id: number, data: any): Promise<void> {
    const record = await this.isNotFound(id);
    if (record.status == statusUser.peding) {
      data.status = statusUser.complete;
    }
    await super.update(id, data);
  }
  async updatePassword(id: number, model: PasswordModel) {
    const record = await this.isNotFound(id);
    const isMatch: boolean = await bcrypt.compare(
      model.oldPassword,
      record.password
    );
    if (!isMatch) {
      throw new CustomError("nhập mật khẩu sai", 400, "oldPassword");
    }
    if (model.oldPassword == model.newPassword) {
      throw new CustomError(
        "Mật khẩu mới trùng với mật khẩu củ",
        400,
        "newPassword"
      );
    }
    if (model.newPassword != model.confirmPassword) {
      throw new CustomError(
        "Mật khẩu xác nhận không trùng với mật khẩu mới",
        400,
        "confirmPassword"
      );
    }
    const newPassowddHash = await this.hashPassword(model.newPassword);
    await this.repository.update(id, {
      password: newPassowddHash,
    });
  }
}
