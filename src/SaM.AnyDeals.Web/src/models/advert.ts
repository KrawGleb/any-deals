import { Attachment } from "./attachment";
import { Contacts } from "./contacts";

export interface Advert {
    title: string;
    description: string;

    isCommercial: boolean;
    isOffline: boolean;

    cityId: number;
    categoryId: number;

    contacts: Contacts;
    attachments: Attachment[];
}