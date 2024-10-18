import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity({
  name: "tutorial"
})
export class Tutorial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}