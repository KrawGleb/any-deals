import { ApplicationUser } from "./applicationUser";

export interface Review {
    id?: number;
    grade: number;
    title: string;
    comment: string;
    advertId?: number;
    createdAt?: string;
    author?: ApplicationUser;
}