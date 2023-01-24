import "./AdvertsList.scss";
import React from "react";
import { Box, Stack } from "@mui/material";
import { AdvertsListProps } from "./AdvertsListProps";
import AdvertCard from "../card/AdvertCard";

export default function AdvertsList({
  adverts,
  onCardClick,
  showStatus,
}: AdvertsListProps) {
  return (
    <Box className="adverts-list__root">
      <Stack className="adverts-list__component" spacing={2}>
        {adverts.map((advert, index) => (
          <AdvertCard
            key={index}
            advert={advert}
            onClick={onCardClick}
            showStatus={showStatus}
          />
        ))}
      </Stack>
    </Box>
  );
}
