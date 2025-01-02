import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupRole } from "./GroupRole";
import { RecipeUser } from "./Recipe_User";
import { SearchHistory } from "./SearchHistory";
import { Rating } from "./Rating";
import { Region } from "./Region";
export enum statusUser{
  peding,complete,ban
}
@Entity()
@Index("fulltext_index",['username'],{fulltext:true})
@Index("IDX_GroupRole",['groupRole','region'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true,type:"nvarchar",length:50})
  username: string;

  @Column({type:"nvarchar",length:255})
  password: string;

  @Column({type:"int",default:statusUser.peding})
  status:statusUser

  @Column({ type: "int"})
  spice_preference: number;  // Độ cay yêu thích của người dùng (1-5)

  @Column({ type: "int"})
  sweetness_preference: number;  // Độ ngọt yêu thích của người dùng (1-5)

  @Column({ type: "int"})
  saltiness_preference: number;  // Độ mặn yêu thích của người dùng (1-5)

  @Column({ nullable: true })
  description: string;  // Mô tả thêm về chế độ ăn uống của người

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @OneToMany(() => RecipeUser,(recipeUser)=>recipeUser.user)
  recipeUsers: RecipeUser[];

  @ManyToOne(()=>GroupRole,(groupRole)=>groupRole.users,{onDelete:"SET NULL"})
  groupRole:GroupRole

  @OneToMany(()=>SearchHistory,(searchHistory)=>searchHistory.user)
  searchHistorys:SearchHistory[]

  @OneToMany(()=>Rating,(rating)=>rating.user)
  ratings:Rating[]

  @ManyToOne(()=>Region,(region)=>region.users,{onDelete:"SET NULL",nullable:true})
  region:Region


}
