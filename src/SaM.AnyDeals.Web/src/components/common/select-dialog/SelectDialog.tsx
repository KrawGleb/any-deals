import {
  Box,
  Dialog,
  Typography,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input";
import "./SelectDialog.scss";

export interface SelectDialogProps {
  open: boolean;
  selectedValue: string | undefined;
  variants: string[];
  onClose: (value: string | undefined) => void;
}

export default function SelectDialog(props: SelectDialogProps) {
  const { onClose, selectedValue, open, variants } = props;
  const [filter, setFilter] = useState("");
  const [listItems, setListItems] = useState<string[]>([]);

  useEffect(() => {
    const filteredList = variants.filter((variant) =>
      variant.toLowerCase().startsWith(filter.toLowerCase())
    );
    setListItems(filteredList);
  }, [filter, variants]);

  const handleClose = () => onClose(selectedValue);
  const handleListItemClick = (value: string) => onClose(value);
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
            <li key={variant}>
              <ListItemButton
                key={variant}
                onClick={() => handleListItemClick(variant)}
              >
                <ListItemText primary={variant} />
              </ListItemButton>
            </li>
          ))}
        </List>
      </Box>
    </Dialog>
  );
}
