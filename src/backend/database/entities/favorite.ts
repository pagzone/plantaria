import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "favorites",
})
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: number


}