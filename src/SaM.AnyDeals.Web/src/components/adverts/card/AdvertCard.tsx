import "./AdvertCard.scss";
import React from "react";
import { Box, Paper } from "@mui/material";
import { AdvertCardProps } from "./AdvertCardProps";
import AttachmentType from "../../../models/enums/attachmentType";
import GoalTag from "../fields/goalTag/GoalTag";
import InterestTag from "../fields/interestTag/InterestTag";
import StatusTag from "../fields/statusTag/StatusTag";

export default function AdvertCard({
  advert,
  onClick,
  showStatus,
}: AdvertCardProps) {
  const previewImage = advert?.attachments.find(
    (a) => a.type === AttachmentType.Image
  );

  if (!advert) return <Paper>Deleted advert</Paper>;

  return (
    <Paper className="advert-card__root" onClick={() => onClick(advert.id)}>
      <Box className="advert-card__content">
        <Box className="advert-card__content__header">
          <Box className="advert-card__content__header__tags">
            <GoalTag goal={advert.goal} />
            <InterestTag interest={advert.interest} />
          </Box>
          {showStatus && (
            <Box className="advert-card__content__header__status">
              <StatusTag status={advert.status} />
            </Box>
          )}
        </Box>
        <p className="advert-card__content__title">{advert.title}</p>
        <p className="advert-card__content__category">
          {advert.category?.name}
        </p>
        {advert.city && (
          <p className="advert-card__content__country">{`${advert.city?.country?.name}, ${advert.city?.name}`}</p>
        )}
        <Box className="advert-card__content__footer">
          <p className="creator">{advert.contacts?.name}</p>
          <p className="date">{new Date(advert.createdAt).toLocaleString()}</p>
        </Box>
      </Box>
      {previewImage && previewImage.link ? (
        <Box className="advert-card__image">
          <img src={previewImage.link} alt="" />
        </Box>
      ) : (
        <></>
      )}
    </Paper>
  );
}
