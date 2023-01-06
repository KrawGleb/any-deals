import {
  Box,
  Dialog,
  Typography,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SelectableItem } from "../../../models/selectableItem";
import Input from "../Input";
import "./SelectDialog.scss";

export interface SelectDialogProps {
  open: boolean;
  selectedValue: SelectableItem;
  variants: SelectableItem[];
  onClose: (value: SelectableItem | undefined) => void;
}

export default function SelectDialog(props: SelectDialogProps) {
  const { onClose, selectedValue, open, variants } = props;
  const [filter, setFilter] = useState("");
  const [listItems, setListItems] = useState<SelectableItem[]>([]);

  useEffect(() => {
    const filteredList = variants.filter((variant) =>
      variant.name.toLowerCase().startsWith(filter.toLowerCase())
    );
    setListItems(filteredList);
  }, [filter, variants]);

  const handleClose = () => {
    setFilter("");
    onClose(selectedValue);
  };
  
  const handleListItemClick = (value: SelectableItem) => {
    setFilter("");
    onClose(value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box className="dialog__root">
        <Typography variant="h5" className="mb-3">
          Select
        </Typography>
        <Input label="Filter" className="mb-3" onChange={handleFilterChange} />
        <List className="dialog__list">
          {listItems.map((variant) => (
            <li key={variant.id}>
              <ListItemButton
                key={variant.id}
                onClick={() => handleListItemClick(variant)}
              >
                <ListItemText primary={variant.name} />
              </ListItemButton>
            </li>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
