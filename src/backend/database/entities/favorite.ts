import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Tutorial } from "./tutorial";
import { Story } from "./story";

@Entity({
  name: "favorites",
})
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @Column({ name: "type", type: "text" })
  targetType: 'tutorial' | 'story';
  
  @Column({ name: "target_id", type: "text" })
  targetId: string;
}