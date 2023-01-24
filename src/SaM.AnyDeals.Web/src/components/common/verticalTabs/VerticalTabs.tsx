import React from "react";
import { styled, Tabs, TabsProps } from "@mui/material";

const CustomVerticalTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "&.MuiTabs-root": {
    ".MuiTabs-scroller": {
      ".MuiTabs-indicator": {
        display: "none",
      },
      ".MuiTabs-flexContainer": {
        ".MuiButtonBase-root": {
          backgroundColor: "white",
          borderBottom: "1px solid rgb(223, 226, 228)",
          padding: "0px 40px",
          minHeight: "2.5rem",
          fontSize: "16px",
          ":first-of-type": {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          },
          ":last-child": {
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            borderBottom: "none",
          },
        },
        ".Mui-selected": {
          backgroundColor: theme.palette.primary.dark,
          color: "white",
        },
      },
    },
  },
}));

export default function VerticalTabs({ children, ...props }: TabsProps) {
  return (
    <CustomVerticalTabs orientation="vertical" {...props}>
      {children}
    </CustomVerticalTabs>
  );
}
