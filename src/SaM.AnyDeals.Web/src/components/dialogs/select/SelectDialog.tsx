import "./SelectDialog.scss";
import React, { ChangeEvent, useMemo, useState } from "react";
import {
  Box,
  Dialog,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  Button,
  Divider,
} from "@mui/material";
import { SelectableItem } from "../../../models/selectableItem";
import Input from "../../common/input/Input";
import { SelectDialogProps } from "./SelectDialogProps";

export default function SelectDialog(props: SelectDialogProps) {
  const { onClose, selectedValue, open, variants, allowCustom } = props;
  const [filter, setFilter] = useState("");
  const [custom, setCustom] = useState("");

  const filteredVariants = useMemo(() => {
    return variants.filter((v) =>
      v.name.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [variants, filter]);

  const handleClose = () => {
    setFilter("");
    onClose(selectedValue);
  };

  const handleListItemClick = (value: SelectableItem) => {
    setFilter("");
    onClose(value);
  };

  const handleOkButtonClick = () => {
    setFilter("");
    onClose({
      name: custom,
    });
  };

  const handleCustomInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustom(e.target.value);

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
          {filteredVariants.map((variant) => (
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

        {allowCustom ? (
          <>
            <Box>
              <Divider className="dialog__divider">OR</Divider>
              <Typography variant="h5" className="mb-3">
                Add custom
              </Typography>
              <Box className="dialog__input">
                <Input onChange={handleCustomInputChange} />
                <Button color="success" onClick={handleOkButtonClick}>
                  OK
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Dialog>
  );
}
