import React from "react";
import { styled, Tabs, TabsProps } from "@mui/material";

const CustomVerticalTabs = styled(Tabs)<TabsProps>(({ theme }) => ({}));

export default function VerticalTabs({ children, ...props }: TabsProps) {
  return <CustomVerticalTabs orientation="vertical" {...props}>{children}</CustomVerticalTabs>;
}
