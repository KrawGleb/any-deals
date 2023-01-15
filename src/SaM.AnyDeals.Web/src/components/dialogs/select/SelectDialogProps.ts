import { SelectableItem } from "../../../models/selectableItem";

export interface SelectDialogProps {
    open: boolean;
    selectedValue: SelectableItem;
    variants: SelectableItem[];
    onClose: (value: SelectableItem | undefined) => void;
  }