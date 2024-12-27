import { ArrayNotEmpty, IsInt, IsNotEmpty, IsPositive, isString, IsString, MaxLength } from "class-validator";

export class RecipeModel{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    description:string;

    @IsString()
    @IsNotEmpty()
    instructions:string;

    @IsString()
    @IsNotEmpty()
    imageUrl:string

    @ArrayNotEmpty()
    categoryId:number[]
    
    @ArrayNotEmpty()
    recipeIngredient:RecipeIngredient[]
    
}
class RecipeIngredient{
    @IsInt()
    @IsPositive()
    ingredientId:number;
    @IsInt()
    @IsPositive()
    quantity:number;
    @IsString()
    @IsNotEmpty()
    unit:string
}