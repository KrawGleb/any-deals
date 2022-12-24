import { styled, Tab, TabProps } from "@mui/material";
import React from "react";

const CustomTab = styled(Tab)<TabProps>(({ theme }) => ({
  backgroundColor: "inherit",
  color: "black",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  textDecoration: "none",
  marginTop: "16px",
  "&.Mui-selected": {
    backgroundColor: "rgb(240, 242, 243);",
    color: "black",
  },
}));

export default function PanelTab(props: any) {
  return <CustomTab disableRipple {...props} />;
}
