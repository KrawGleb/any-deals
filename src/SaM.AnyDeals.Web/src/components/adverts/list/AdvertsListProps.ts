import { Advert } from "../../../models/api/advert";

export interface AdvertsListProps {
  adverts: Advert[];
  onCardClick: (id: number) => void;
  showStatus?: boolean;
}
