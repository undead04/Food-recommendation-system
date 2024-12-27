import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RecipeCategory } from "./Recipe_Category";
import { Recipe } from "./Recipe";
import { User } from "./User";

@Entity()
@Index("fulltext_idx",['name'],{fulltext:true})
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'nvarchar',length:50})
  name:string

  @CreateDateColumn()
  createAt:Date

  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(()=>Recipe,(recipe)=>recipe.region)
  recipes:Recipe[]
  @OneToMany(()=>User,(user)=>user.region)
  users:User[]
}
