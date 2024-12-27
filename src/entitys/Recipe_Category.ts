import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Category } from "./Category";

@Entity()
@Index("IDX_Recipe_Category",['recipe','category'])
export class RecipeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeCategorys,{onDelete:"CASCADE"})
  recipe: Recipe;

  @ManyToOne(() => Category, (category) => category.recipeCategorys,{onDelete:"CASCADE"})
  category: Category;
}
