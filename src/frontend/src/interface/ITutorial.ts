import { IUser } from "./IUser";

export interface ITutorial {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  created_at: string;
  user: IUser;
}