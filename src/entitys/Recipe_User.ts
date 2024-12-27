import { Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
@Index("IDX_User_Recipe", ['user', 'recipe'])  // Chỉ mục cho user và recipe trong RecipeUser
export class RecipeUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recipeUsers,{onDelete:"CASCADE"})
  user: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.reciepeUsers,{onDelete:"CASCADE"})
  recipe: Recipe;
}
