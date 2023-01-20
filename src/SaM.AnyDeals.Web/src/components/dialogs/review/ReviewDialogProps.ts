import { Review } from "../../../models/api/review";

export interface ReviewDialogProps {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: (review: Review) => void;
}
