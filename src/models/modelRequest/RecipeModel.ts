import { Type } from "class-transformer";
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, ValidateNested } from "class-validator";

// Lớp RecipeModel
export class RecipeModel {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ArrayNotEmpty()
  categoryId: number[];

  @IsInt()
  @IsPositive()
  regionId: number;

  
  @ArrayNotEmpty()
  @ValidateNested({ each: true }) // Ensure each item in recipeIngredient is validated
  @Type(() => RecipeIngredientModel) // Ensure transformation from plain object to RecipeIngredientModel
  recipeIngredient: RecipeIngredientModel[];

  @IsNumber()
  @IsPositive()
  timeCook: number;

  @IsNumber()
  @IsPositive()
  @Max(5)
  spice_level: number;

  @IsNumber()
  @IsPositive()
  @Max(5)
  sweetness_level: number;

  @IsNumber()
  @IsPositive()
  @Max(5)
  saltiness_level: number;
}

// Lớp RecipeIngredientModel
export class RecipeIngredientModel {
  @IsInt()
  @IsPositive()
  ingredientId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}
