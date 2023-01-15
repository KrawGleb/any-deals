import React from "react";
import { styled, Tabs, TabsProps } from "@mui/material";

const CustomTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "&.MuiTabs-flexContainer": {
    height: "100%",
  },
  "&.MuiTabs-root": {
    display: "flex",
    flex: "0 0 auto",
    alignSelf: "stretch",
    ".MuiTabs-scroller": {
      ".MuiTabs-flexContainer": {
        height: "100%",
        display: "flex",
      },
      ".MuiTabs-indicator": {
        display: "none",
      },
    },
  },
}));

export default function PanelTabs({ ...props }: any) {
  return <CustomTabs {...props} />;
}
