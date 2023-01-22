export interface Review {
    id?: number;
    grade: number;
    title: string;
    comment: string;
    advertId?: number;
    createdAt?: Date;
}