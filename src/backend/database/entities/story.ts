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
  name: "story"
})
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "text", nullable: true })
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.stories)
  user: User;
}