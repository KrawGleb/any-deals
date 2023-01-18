import React from "react";
import { styled, Tab, TabProps } from "@mui/material";

const CustomNavTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiTab-root": {
    textTransform: "none",
  },
}));

export default function NavTab(props: TabProps) {
  return <CustomNavTab {...props} />;
}
