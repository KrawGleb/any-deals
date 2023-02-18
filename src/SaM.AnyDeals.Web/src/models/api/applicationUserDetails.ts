import { Advert } from "./advert";
import { ApplicationUser } from "./applicationUser";

export interface ApplicationUserDetails {
  user: ApplicationUser;
  adverts: Advert[];
  averageRatingDescriptions: {
    averageRating: number;
    category: string;
    reviewsCount: number;
  }[];
}
