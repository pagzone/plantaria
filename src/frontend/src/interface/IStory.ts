import { IUser } from "./IUser";

export interface IStory {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  created_at: string;
  user: IUser;
}