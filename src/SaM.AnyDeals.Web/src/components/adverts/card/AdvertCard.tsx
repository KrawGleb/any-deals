import "./AdvertCard.scss";
import React from "react";
import { Box, Paper } from "@mui/material";
import { AdvertCardProps } from "./AdvertCardProps";
import AttachmentType from "../../../models/enums/attachmentType";
import GoalTag from "../fields/goalTag/GoalTag";
import InterestTag from "../fields/interestTag/InterestTag";

export default function AdvertCard({ advert, onClick }: AdvertCardProps) {
  const previewImage = advert.attachments.find(
    (a) => a.type === AttachmentType.Image
  );

  return (
    <Paper className="card__root" onClick={() => onClick(advert.id)}>
      <Box className="card__content">
        <Box className="card__content__header">
          <GoalTag goal={advert.goal} />
          <InterestTag interest={advert.interest} />
        </Box>
        <p className="card__content__title">{advert.title}</p>
        <p className="card__content__category">{advert.category.name}</p>
        <p className="card__content__country">{`${advert.city.country?.name}, ${advert.city.name}`}</p>
        <Box className="card__content__footer">
          <p className="creator">{advert.contacts.name}</p>
          <p className="date">{new Date(advert.createdAt).toLocaleString()}</p>
        </Box>
      </Box>
      {previewImage && previewImage.link ? (
        <Box className="card__image">
          <img src={previewImage.link} alt="" />
        </Box>
      ) : (
        <></>
      )}
    </Paper>
  );
}
