import { Advert } from "../../../models/api/advert";

export interface OrderConfirmationDialogProps {
  open: boolean;
  handleCancel: () => void;
  advert?: Advert;
}
