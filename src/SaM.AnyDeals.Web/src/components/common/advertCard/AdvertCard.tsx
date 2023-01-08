import "./AdvertCard.scss";
import React from "react";
import { Box, ListItem } from "@mui/material";

export default function AdvertCard() {
  return (
    <ListItem className="card__root">
      <Box className="card__content">
        <Box className="card__content__header">
          <Box className="goal">Goal</Box>
          <Box className="interest">Interest</Box>
        </Box>
        <p className="card__content__title">Title</p>
        <p className="card__content__category">Category</p>
        <p className="card__content__country">Country</p>
        <Box className="card__content__footer">
          <p className="creator">Name</p>
        </Box>
      </Box>
      <Box className="card__image">
        <img src="https://vmestestorage.s3.eu-central-1.amazonaws.com/20e52b99-c281-4a54-9823-d26319f16602/73e52d2c-7536-4416-b74f-b65955f94ad0.jpeg" />
      </Box>
    </ListItem>
  );
}
