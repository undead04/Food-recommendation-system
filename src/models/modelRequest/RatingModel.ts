import { IsNotEmpty, IsString, Max, Min } from "class-validator";
export class RatingRequest {
  @IsString()
  @IsNotEmpty()
  comment: string;
  @Min(1)
  @Max(5)
  rate: number;
  @IsNotEmpty()
  recipeId: number;
}
export class RatingModel extends RatingRequest {
  @IsNotEmpty()
  userId: number;
}
