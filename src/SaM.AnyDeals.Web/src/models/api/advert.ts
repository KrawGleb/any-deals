import { ApplicationUser } from "./applicationUser";
import { Attachment } from "./attachment";
import { Category } from "./category";
import { City } from "./city";
import { Contacts } from "./contacts";

export interface Advert {
  id: number;
  title: string;
  description: string;
  goal: number;
  group: number;
  status: number;
  interest: number;
  city: City;
  category: Category;
  contacts: Contacts;
  attachments: Attachment[];
  creator: ApplicationUser;
  createdAt: string;
}
