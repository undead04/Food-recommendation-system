import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CategoryModel{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name:string
}