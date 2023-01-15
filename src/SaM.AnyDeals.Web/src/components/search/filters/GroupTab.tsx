import { styled, Tab, TabProps } from "@mui/material";
import React from "react";

const CustomGroupTab = styled(Tab)<TabProps>(({ theme }) => ({
  "&.MuiTab-root": {
    textTransform: "none",
  },
}));

export default function GroupTab({ ...props }) {
  return <CustomGroupTab {...props} />;
}
