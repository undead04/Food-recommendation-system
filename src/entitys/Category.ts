import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RecipeCategory } from "./Recipe_Category";

@Entity()
@Index("fulltext_idx",['name'],{fulltext:true})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'nvarchar',length:50,unique:true})
  name: string;

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeCategory,(recipeCategory)=>recipeCategory.category)
  recipeCategorys: RecipeCategory[];
}
