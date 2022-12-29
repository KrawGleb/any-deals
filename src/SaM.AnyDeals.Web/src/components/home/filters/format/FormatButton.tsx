import { styled, ToggleButton, ToggleButtonProps } from "@mui/material";
import React from "react";

const CustomFormatButton = styled(ToggleButton)<ToggleButtonProps>(
  ({ theme }) => ({
    "&.MuiToggleButton-root": {
      borderRadius: "10px !important",
      padding: "0 2.5rem",
      minHeight: "2.5rem",
    },
  })
);

export default function FormatButton({
  children,
  ...props
}: ToggleButtonProps) {
  return (
    <CustomFormatButton disableRipple {...props}>
      {children}
    </CustomFormatButton>
  );
}
