import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { IngredientType } from "./IngredientType";

@Entity()
export class UserDietaryPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  

  @Column({ type: "int"})
  spice_preference: number;  // Độ cay yêu thích của người dùng (1-5)

  @Column({ type: "int"})
  sweetness_preference: number;  // Độ ngọt yêu thích của người dùng (1-5)

  @Column({ type: "int"})
  saltiness_preference: number;  // Độ mặn yêu thích của người dùng (1-5)

  @Column()
  favorite_food: string;  // Thực phẩm yêu thích, ví dụ: "fish", "meat", "vegetables"

  @Column({ nullable: true })
  description: string;  // Mô tả thêm về chế độ ăn uống của người 
  
  @ManyToOne(() => User, (user) => user.dietaryPreferences,{onDelete:"CASCADE"})
  user: User;

  @ManyToOne(()=>IngredientType,(ingredientType)=>ingredientType.ingredients,{onDelete:"CASCADE"})
  ingredientType:IngredientType
}
