import { Attachment } from "./attachment";
import { Contacts } from "./contacts";

export interface Advert {
    title: string;
    description: string;
    goal: number;
    group: number;
    interest: number;
    cityId: number;
    categoryId: number;
    contacts: Contacts;
    attachments: Attachment[];
}