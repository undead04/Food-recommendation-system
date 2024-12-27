import { Column, CreateDateColumn, Entity, Index,  ManyToOne,  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RecipeIngredient } from "./Recipe_Ingredient";
import { RecipeCategory } from "./Recipe_Category";
import { RecipeUser } from "./Recipe_User";
import { Rating } from "./Rating";
import { Region } from "./Region";

@Entity()
@Index("fulltext_index", ["name", "description"],{fulltext:true})
@Index("IDX_Recipe",['region','timeCook']) 
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"nvarchar",nullable:true,length:50})
  name: string;

  @Column({type:"nvarchar",length:250})
  description: string;

  @Column({type:"text"})
  instructions: string;

  @Column({type:"nvarchar"})
  imageUrl:string

  @Column({type:'int'})
  timeCook:number

  @Column({ type: "int" })
  spice_level: number;  // Độ cay (1-5), ví dụ: 1 là nhẹ, 5 là rất cay

  @Column({ type: "int" })
  sweetness_level: number;  // Độ ngọt (1-5), ví dụ: 1 là ít ngọt, 5 là rất ngọt

  @Column({ type: "int", })
  saltiness_level: number;  // Độ mặn (1-5), ví dụ: 1 là ít mặn, 5 là rất mặn
  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeIngredient,(recipeIngredient)=>recipeIngredient.recipe)
  recipeIngredients: RecipeIngredient[];

  @OneToMany(() => RecipeCategory,(recipeCategory)=>recipeCategory.recipe)
  recipeCategorys: RecipeCategory[];

  @OneToMany(() => RecipeUser,(recipeUser)=>recipeUser.recipe)
  reciepeUsers: RecipeUser[];

  @OneToMany(()=>Rating,(rating)=>rating.recipe)
  ratings:Rating[]
  @ManyToOne(()=>Region,(region)=>region.recipes,{onDelete:"SET NULL"})
  region:Region
}
