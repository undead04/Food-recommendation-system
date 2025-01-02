import { NextFunction,Response } from "express";
import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { RepositoryDTO } from "utils/ReponseDTO";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction): void {
    res.status(error.statusCode || 500).json(RepositoryDTO.Error(error.statusCode,error.field?{
      [error.field]:error.message
    }:error.message));
  }

}