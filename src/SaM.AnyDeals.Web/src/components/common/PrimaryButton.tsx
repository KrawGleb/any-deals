import { Button } from "@mui/material";
import React from "react";

const PrimaryButton = ({ children, ...props }: any) => {
  return (
    <Button fullWidth variant="contained" {...props} color="primary">
      {children}
    </Button>
  );
};

export default PrimaryButton;
