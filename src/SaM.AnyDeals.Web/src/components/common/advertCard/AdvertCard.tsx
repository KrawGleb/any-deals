import "./AdvertCard.scss";
import React from "react";
import { Box, Paper } from "@mui/material";
import { AdvertCardProps } from "./AdvertCardProps";
import AttachmentType from "../../../models/enums/attachmentType";
import { Goal } from "../../../models/enums/goal";
import { Interest } from "../../../models/enums/interest";

export default function AdvertCard({ advert }: AdvertCardProps) {
  const previewImage = advert.attachments.find(
    (a) => a.type === AttachmentType.Image
  );

  const getGoalClassName = (goal: number) => (goal === 0 ? "goal__request" : "goal__offer");
  const getInterestClassName = (interest: number) =>
    interest === 0 ? "commercial" : "social";

  return (
    <Paper className="card__root">
      <Box className="card__content">
        <Box className="card__content__header">
          <Box className={"goal " + getGoalClassName(advert.goal)}>
            {Goal.convert(advert.goal)}
          </Box>
          <Box className={"interest " + getInterestClassName(advert.interest)}>
            {Interest.convert(advert.interest)}
          </Box>
        </Box>
        <p className="card__content__title">{advert.title}</p>
        <p className="card__content__category">{advert.category.name}</p>
        <p className="card__content__country">{`${advert.city.country?.name}, ${advert.city.name}`}</p>
        <Box className="card__content__footer">
          <p className="creator">{advert.creator.userName}</p>
        </Box>
      </Box>
      {previewImage ? (
        <Box className="card__image">
          <img src={previewImage.link} alt="" />
        </Box>
      ) : (
        <></>
      )}
    </Paper>
  );
}
