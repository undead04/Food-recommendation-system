import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupRole } from "./GroupRole";
import { RecipeUser } from "./Recipe_User";
import { SearchHistory } from "./SearchHistory";
import { Rating } from "./Rating";
import { Region } from "./Region";
import { UserDietaryPreferences } from "./userDietaryPreferences";

@Entity()
@Index("fulltext_index",['username'],{fulltext:true})
@Index("IDX_GroupRole",['groupRole'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true,type:"nvarchar",length:50})
  username: string;

  @Column({type:"nvarchar",length:255})
  password: string;

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

  @ManyToOne(()=>Region,(region)=>region.users,{onDelete:"SET NULL"})
  region:Region
  @OneToMany(()=>UserDietaryPreferences,(userDietary)=>userDietary.user)
  dietaryPreferences:UserDietaryPreferences
}
