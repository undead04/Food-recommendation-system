import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RecipeIngredient } from "./Recipe_Ingredient";

@Entity()
@Index('IDX_Name',['name'],{fulltext:true})
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"nvarchar",length:50,unique:true})
  name: string;

  @Column()
  imageUrl:string;

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeIngredient,(recipeIngredient)=>recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredient[];

}
