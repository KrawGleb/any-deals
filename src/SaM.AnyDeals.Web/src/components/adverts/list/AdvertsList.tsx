import "./AdvertsList.scss";
import React from "react";
import { Box, Stack } from "@mui/material";
import { AdvertsListProps } from "./AdvertsListProps";
import AdvertCard from "../card/AdvertCard";
import AnimatedBox from "../../common/animated/box/AnimatedBox";
import Placeholder from "../../common/placeholder/Placeholder";

export default function AdvertsList({
  adverts,
  onCardClick,
  showStatus,
}: AdvertsListProps) {
  return adverts.length > 0 ? (
    <Box className="adverts-list__root">
      <Stack className="adverts-list__component" spacing={2}>
        {adverts.map((advert, index) => (
          <AnimatedBox key={index} delay={index * 0.1}>
            <AdvertCard
              key={index}
              advert={advert}
              onClick={onCardClick}
              showStatus={showStatus}
            />
          </AnimatedBox>
        ))}
      </Stack>
    </Box>
  ) : (
    <Box className="adverts-list__empty">
      <Placeholder />
    </Box>
  );
}
