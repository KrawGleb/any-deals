import { styled, Tabs, TabsProps } from "@mui/material";
import React from "react";

const CustomGoalTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "&.MuiTabs-root": {
    ".MuiTabs-scroller": {
      ".MuiTabs-indicator": {
        display: "none",
      },
      ".MuiTabs-flexContainer": {
        ".MuiButtonBase-root": {
          backgroundColor: "white",
          borderRight: "1px solid rgb(223, 226, 228)",
          padding: "0px 40px",
          minHeight: "2.5rem",
          ":first-of-type": {
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          },
          ":last-child": {
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderRight: "none",
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

export default function GoalTabs({ children, ...props }: any) {
  return <CustomGoalTabs {...props}>{children}</CustomGoalTabs>;
}
