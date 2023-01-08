import "./AdvertsList.scss";
import { Box, List, ListItem } from "@mui/material";
import React from "react";
import AdvertCard from "../../common/advertCard/AdvertCard";

export default function AdvertsList() {
  return (
    <Box className="list__root">
      <List className="list__component">
        <AdvertCard />
      </List>
    </Box>
  );
}
