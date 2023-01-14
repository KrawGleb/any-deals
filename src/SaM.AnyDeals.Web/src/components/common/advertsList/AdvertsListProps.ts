import { Advert } from "../../../models/api/advert";

export interface AdvertsListProps {
  adverts: Advert[];
  allowEditing: boolean;
  styles: { height: string };
}
