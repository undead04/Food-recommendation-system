import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
@Index("IDX_Fulltext", ['search'],{fulltext:true})
@Index("IDX_SearchHistory",['user'])
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"text"})
  search:string

  @CreateDateColumn()
  createAt:Date
  
  @UpdateDateColumn()
  updateAt:Date

  @ManyToOne(()=>User,(user)=>user.searchHistorys,{onDelete:"CASCADE"})
  user:User
}
