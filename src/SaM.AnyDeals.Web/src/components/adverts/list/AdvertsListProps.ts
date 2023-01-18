import { Advert } from "../../../models/api/advert";

export interface AdvertsListProps {
  adverts: Advert[];
  onCardClick: (id: number) => void;

  // TODO: Fix it
  styles: { height: string };
}
