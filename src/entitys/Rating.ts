import { Check, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";


@Entity()
@Index("IDX_Rating", ['recipe','user'])  // Chỉ mục cho user và recipe trong RecipeUser
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"nvarchar",length:255})
  comment:string

  @Check('rate > 0')
  @Column({type:'int'})
  rate:number

  @CreateDateColumn()
  createAt:Date

  @UpdateDateColumn()
  updateAt:Date

  @ManyToOne(()=>Recipe,(recipe)=>recipe.ratings,{onDelete:"CASCADE"})
  recipe:Recipe
  @ManyToOne(()=>User,(user)=>user.ratings,{onDelete:"CASCADE"})
  user:User
}
