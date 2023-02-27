import "./OrderCard.scss";
import React from "react";
import { OrderCardProps } from "./OrderCardProps";
import { Box, Paper } from "@mui/material";
import AttachmentType from "../../../models/enums/attachmentType";
import InterestTag from "../../adverts/fields/interestTag/InterestTag";
import GoalTag from "../../adverts/fields/goalTag/GoalTag";

export default function OrderCard({ order, onClick }: OrderCardProps) {
  const advert = order.advert;
  const previewImage = advert?.attachments.find(
    (a) => a.type === AttachmentType.Image
  );

  if (!advert) return null;

  return (
    <Paper className="order-card__root" onClick={() => onClick(order)}>
      <Box className="order-card__content">
        <Box className="order-card__content__header">
          <Box className="order-card__content__header__tags">
            <GoalTag goal={advert.goal} />
            <InterestTag interest={advert.interest} />
          </Box>
        </Box>
        <p className="order-card__content__title">{advert.title}</p>
        <p className="order-card__content__category">{advert.category?.name}</p>
        {advert.city && (
          <p className="order-card__content__country">{`${advert.city?.country?.name}, ${advert.city?.name}`}</p>
        )}
        <Box className="order-card__content__footer">
          <p className="creator">{advert.contacts?.name}</p>
          <p className="date">{new Date(order.createdAt).toLocaleString()}</p>
        </Box>
      </Box>
      {previewImage && previewImage.link ? (
        <Box className="order-card__image">
          <img src={previewImage.link} alt="" />
        </Box>
      ) : (
        <></>
      )}
    </Paper>
  );
}
