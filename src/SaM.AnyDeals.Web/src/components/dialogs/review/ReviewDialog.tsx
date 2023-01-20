import "./ReviewDialog.scss";
import React from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { ReviewDialogProps } from "./ReviewDialogProps";
import Input from "../../common/Input";

export default function ReviewDialog({
  open,
  handleCancel,
  handleSubmit,
}: ReviewDialogProps) {
  return (
    <Dialog onClose={handleCancel} open={open}>
      <Box className="review-dialog">
        <Typography variant="h5" textAlign="center">
          Review
        </Typography>
        <Input label="Title" />
        <Input label="Comment" multiline rows={4} />
        <Box className="review-dialog__actions">
          <Button variant="contained" color="success" onClick={handleCancel}>
            Submit and continue
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
