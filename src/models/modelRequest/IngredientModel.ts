import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator"

export class IngredientModel{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name:string
    @IsString()
    @IsNotEmpty()
    imageUrl:string
   
}