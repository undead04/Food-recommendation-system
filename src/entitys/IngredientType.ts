import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Ingredient } from './Ingredient';
import { UserDietaryPreferences } from './userDietaryPreferences';

@Entity()
@Index("IDX_Type",['name'],{fulltext:true})
export class IngredientType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"nvarchar",length:255})
  name: string;  // Ví dụ: "vegetable", "meat", "fish", "spice", "fruit", v.v.

  @CreateDateColumn()
  createAt:Date
    
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(()=>Ingredient,(ingredient)=>ingredient.ingredientType)
  ingredients:Ingredient[]

  @OneToMany(()=>UserDietaryPreferences,(userdie)=>userdie.ingredientType)
  dietaryPreferences:UserDietaryPreferences[]
}
