import React from "react";
import { styled, Tab, TabProps } from "@mui/material";

const CustomVerticalTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiTab-root": {
    textTransform: "none",
  },
}));

export default function VerticalTab(props: TabProps) {
  return <CustomVerticalTab {...props} />;
}
