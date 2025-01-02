import { Check, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from './Ingredient';

@Entity()
@Index("IDX_Recipe_Ingredient",['recipe','ingredient'])
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"int"})
  @Check("quantity >= 0")
  quantity: number;

  @Column({type:"nvarchar"})
  unit: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients,{onDelete:"CASCADE"})
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients,{onDelete:"CASCADE"})
  ingredient: Ingredient;
}
