import "./AdvertsList.scss";
import { Box, Stack } from "@mui/material";
import React from "react";
import AdvertCard from "../advertCard/AdvertCard";
import { AdvertsListProps } from "./AdvertsListProps";

export default function AdvertsList({
  adverts,
  allowEditing,
  styles,
}: AdvertsListProps) {
  return (
    <Box className="list__root">
      <Stack className="list__component" spacing={2} sx={styles}>
        {adverts.map((advert, index) => (
          <AdvertCard key={index} advert={advert} allowEditing={allowEditing} />
        ))}
      </Stack>
    </Box>
  );
}
