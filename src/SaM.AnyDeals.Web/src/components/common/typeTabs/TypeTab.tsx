import { styled, Tab, TabProps } from "@mui/material";
import React from "react";

const CustomTypeTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiTab-root": {
    textTransform: "none",
  },
}));

export default function TypeTab({ ...props }) {
  return <CustomTypeTab {...props} />;
}
