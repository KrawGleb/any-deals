import "./AdvertsDetails.scss";
import React, { useState } from "react";
import {
  useGetAdvertByIdQuery,
  useGetAdvertReviewsQuery,
} from "../../../features/api/extensions/advertsApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import { Box, Button, Paper, Typography } from "@mui/material";
import GoalTag from "../../../components/adverts/fields/goalTag/GoalTag";
import InterestTag from "../../../components/adverts/fields/interestTag/InterestTag";
import AttachmentCard from "../../../components/adverts/fields/attachmentCard/AttachmentCard";
import ContactsGrid from "../../../components/adverts/fields/contactsGrid/ContactsGrid";
import ReviewCard from "../../../components/review/card/ReviewCard";
import { Review } from "../../../models/api/review";
import OrderConfirmationDialog from "../../../components/dialogs/orderConfirmation/OrderConfirmationDialog";
import { Interest } from "../../../models/enums/interest";

export default function AdvertsDetails() {
  const [isOrderConfirmationDialogOpen, setIsOrderConfirmationDialogOpen] =
    useState(false);
  const handleOrderConfirmationDialogCancel = () => {
    setIsOrderConfirmationDialogOpen(false);
  };
  const handleOrderClick = () => {
    setIsOrderConfirmationDialogOpen(true);
  };

  const query = useQuery() as any;
  const advertId: number = +query.get("id");
  const { data: advert } = useGetAdvertByIdQuery(advertId);
  const { data: reviews } = useGetAdvertReviewsQuery({ id: advertId });

  return (
    <>
      <OrderConfirmationDialog
        open={isOrderConfirmationDialogOpen}
        handleCancel={handleOrderConfirmationDialogCancel}
        advert={advert}
      />

      {!!advert ? (
        <div className="details">
          <div className="details__container">
            <div className="details__body">
              <Paper className="details__content">
                <div className="details__content__header">
                  <GoalTag goal={advert.goal} />
                  <InterestTag interest={advert.interest} />
                </div>

                <Typography variant="h5" fontWeight="bold" className="mb-2">
                  {advert.title}
                </Typography>
                <Typography variant="subtitle1">
                  {advert.category.name}
                </Typography>

                <Typography variant="subtitle2" className="mb-2">
                  {advert.city.country.name}, {advert.city.name}
                </Typography>
                {advert.description ? (
                  <div className="details__content__description">
                    {advert.description}
                  </div>
                ) : (
                  <></>
                )}
              </Paper>
              {advert.attachments.length > 0 ? (
                <Paper className="details__attachments">
                  {advert.attachments.map((attachment, index) => (
                    <AttachmentCard key={index} attachment={attachment} />
                  ))}
                </Paper>
              ) : (
                <></>
              )}
            </div>
            <ContactsGrid contacts={advert.contacts} />
          </div>

          {!!reviews && reviews.length > 0 ? (
            <Paper className="details__reviews">
              {reviews?.map((review: Review, index: number) => (
                <ReviewCard key={index} review={review} />
              ))}
            </Paper>
          ) : (
            <></>
          )}

          <Paper className="details__footer">
            <Box className="details__footer__container">
              <Box className="details__footer__price">
                {advert?.price ? <p>{advert?.price} $</p> : <></>}
              </Box>
              <Box className="details__footer__order">
                <Button
                  style={{ textTransform: "none" }}
                  variant="contained"
                  color="success"
                  onClick={handleOrderClick}
                >
                  Order
                </Button>
              </Box>
            </Box>
          </Paper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
