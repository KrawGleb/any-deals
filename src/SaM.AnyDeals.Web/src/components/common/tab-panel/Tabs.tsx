import { styled, Tabs, TabsProps } from "@mui/material";
import React from "react";

const CustomTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "&.MuiTabs-flexContainer": {
    height: "100%",
  },
  "&.MuiTabs-root": {
    display: "flex",
    flex: "1 1 auto",
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

export default function PanelTabs({ children, ...props }: any) {
  return <CustomTabs {...props}>{children}</CustomTabs>;
}
