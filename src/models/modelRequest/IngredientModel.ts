import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class IngredinetModel{
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name:string
    @IsString()
    @IsNotEmpty()
    imageUrl:string
}