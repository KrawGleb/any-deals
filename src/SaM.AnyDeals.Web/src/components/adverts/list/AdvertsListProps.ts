import { Advert } from "../../../models/api/advert";

export interface AdvertsListProps {
  adverts: Advert[];
  allowEditing: boolean;

  // TODO: Fix it
  styles: { height: string };
}