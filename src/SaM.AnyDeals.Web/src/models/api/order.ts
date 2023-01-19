import { Advert } from "./advert";
import { ApplicationUser } from "./applicationUser";

export interface Order {
    id: number;
    advert: Advert;
    customer: ApplicationUser;
    executor: ApplicationUser;
    hasCustomerApproval: boolean;
    hasExecutorApproval: boolean;
    createdAt: Date;
}
