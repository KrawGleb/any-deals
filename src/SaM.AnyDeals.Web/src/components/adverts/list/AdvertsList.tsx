import "./AdvertsList.scss";
import React from "react";
import { Box, Stack } from "@mui/material";
import { AdvertsListProps } from "./AdvertsListProps";
import AdvertCard from "../card/AdvertCard";

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