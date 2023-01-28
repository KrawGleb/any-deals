import { ApplicationUser } from "./applicationUser";

export interface Message {
  id: number;
  text: string;
  createdAt: Date;
  sender: ApplicationUser;
}
