import React from "react";
import { styled, ToggleButton, ToggleButtonProps } from "@mui/material";

const CustomInterestButton = styled(ToggleButton)<ToggleButtonProps>(
  ({ theme }) => ({
    "&.MuiToggleButton-root": {
      borderRadius: "10px !important",
      padding: "0 2.5rem",
      minHeight: "2.5rem",
      border: "1px solid lightgray !important"
    },
  })
);

export default function InterestButton({
  children,
  ...props
}: ToggleButtonProps) {
  return (
    <CustomInterestButton disableRipple {...props}>
      {children}
    </CustomInterestButton>
  );
}
