import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class RatingModel{
    @IsString()
    @IsNotEmpty()
    comment:string;
    @Min(1)
    @Max(5)
    rate:number;
    @IsNotEmpty()
    recipeId:number;
    @IsNotEmpty()
    userId:number;
}