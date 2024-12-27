import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { RecipeCategory } from "./Recipe_Category";

@Entity()
@Index("fulltext_idx",['name'],{fulltext:true})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'nvarchar',length:50})
  name: string;

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeCategory,(recipeCategory)=>recipeCategory.category)
  recipeCategorys: RecipeCategory[];
}
