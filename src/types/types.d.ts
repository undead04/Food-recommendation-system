import { Request } from "express";

declare module "express" {
    export interface Request  {
        record?: any; // hoặc thay `any` bằng kiểu chính xác của `record`
    }
}
