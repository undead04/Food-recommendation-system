import {  Response } from "express";
import BaseController from "../utils/BaseController";
import { DeleteModel } from "../models/modelRequest/DeleteModel";
import UserService from "../services/UserService";
import { authenticateToken, AuthRequest } from "../Middlewares/Auth";
import { Body, Delete, Get, JsonController, Param, Put, QueryParams, Req, Res, UseBefore } from "routing-controllers";
import AppRole from "../models/modelRequest/AppRole";
import { notFound, notFoundArray } from "../Middlewares/NotFoundHandle";
import { statusUser, User } from "../entitys/User";
import validateError from "../Middlewares/ValidateErrorDTO";
import { PasswordModel, UserModel } from "../models/modelRequest/UserModel";
@JsonController('/user')
export default class UserController extends BaseController<UserService>{
    constructor(){
        const service = new UserService()
        super(service)
    }
    @Delete('/')
    @UseBefore(authenticateToken([AppRole.Admin]),notFoundArray(User,'user'),validateError(DeleteModel))
    async deleteArray(@Body() data: DeleteModel,@Res() res: Response): Promise<Response<any, Record<string, any>>> {
        return await super.deleteArray(data,res)
    }
    @Get('/getMe')
    @UseBefore(authenticateToken())
    async getMe(@Req()req:AuthRequest,@Res() res:Response){
        try{
            const id =req._id
            const record = await this.service.getById(id)
            return this.sendResponse(res,200,'Lấy dữ liệu thành công',record)
        }catch(error:any){
            console.log(error)
            throw error
        }
    }
    @Put('/password')
    @UseBefore(authenticateToken(),validateError(PasswordModel))
    async updatePassword(@Req() req:AuthRequest,@Body() data:PasswordModel,@Res() res:Response){
        try{
            const id = req._id
            await this.service.updatePassword(id,data)
            return this.sendSuccess(res,"Cập nhập mật khẩu thành công",200)
        }catch(error:any){
            console.log(error)
            throw error
        }
    }
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
      return await super.getOne(id,res)
    }
    @Get('/')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async getFilter(@QueryParams() filter: any,@Res() res: Response) {
        const data = await this.service.getFilter(filter.name || "");
        return this.sendResponse(res,200,'Lấy dữ liệu thành công',data)
    }
    @Put('/:id')
    @UseBefore(authenticateToken([AppRole.Admin]),notFound(User,'user'))
    async banUser(@Req() req:AuthRequest, @Body() data: any, @Res() res: Response) {
      const id = req._id
      return await super.update(id,{status:statusUser.ban},res)
    }
    @Put('/')
    @UseBefore(authenticateToken(),validateError(UserModel))
    async updateUser(@Req() req:AuthRequest, @Body() data: UserModel, @Res() res: Response) {
      const id = req._id
      return await super.update(id,{
        spice_preference:data.spice_preference,sweetness_preference:data.sweetness_preference,
        saltiness_preference:data.saltiness_preference,description:data.description
        ,region:{id:data.regionId}},res)
    }
   
    @Delete('/:id')
    @UseBefore(authenticateToken([AppRole.Admin]))
    async delete(@Param('id') id: number, @Res()res: Response): Promise<Response<any, Record<string, any>>> {
      return await super.delete(id,res)
    }
}