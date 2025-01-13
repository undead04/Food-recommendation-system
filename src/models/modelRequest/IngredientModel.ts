import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class IngredientModel {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  /**
   * @isInt we would kindly ask you to provide a number here
   * @minimum minimum age is 18
   */
  name: string;
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
