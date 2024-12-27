import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { RecipeIngredient } from "./Recipe_Ingredient";
import { IngredientType } from "./IngredientType";

@Entity()
@Index('IDX_Name',['name'],{fulltext:true})
@Index("IDX_keyForeign",['ingredientType'])
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"nvarchar",length:50})
  name: string;

  @Column()
  imageUrl:string;

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeIngredient,(recipeIngredient)=>recipeIngredient.ingredient)
  recipeIngredients: RecipeIngredient[];

  @ManyToOne(()=>IngredientType,(ingredientType)=>ingredientType.ingredients,{onDelete:"CASCADE"})
  ingredientType:IngredientType
 
}
