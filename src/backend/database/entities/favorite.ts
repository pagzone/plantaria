import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity({
  name: "favorites",
})
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @Column({ name: "type", type: "text" })
  targetType: 'tutorial' | 'story';

  @Column({ name: "target_id", type: "int" })
  targetId: number;
}