import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Tutorial } from "./tutorial";

@Entity({
  name: "favorites",
})
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.favorites)
  tutorial: Tutorial;
}