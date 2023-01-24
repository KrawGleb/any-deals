import { Advert } from "../../../models/api/advert";

export interface AdvertCardProps {
  advert: Advert;
  onClick: (id: number) => void;
  showStatus?: boolean;
}
