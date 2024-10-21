import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Favorite } from "./favorite";

@Entity({
  name: "tutorials"
})
export class Tutorial extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  category: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text"})
  content: string;

  @Column({ type: "text", nullable: true })
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.tutorials)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.tutorial)
  favorites: Favorite[]
}