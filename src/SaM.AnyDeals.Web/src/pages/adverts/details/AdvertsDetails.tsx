import "./AdvertsDetails.scss";
import React from "react";
import {
  useGetAdvertByIdQuery,
  useGetAdvertReviewsQuery,
} from "../../../features/api/extensions/advertsApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import { Box, Button, Paper } from "@mui/material";
import GoalTag from "../../../components/adverts/fields/goalTag/GoalTag";
import InterestTag from "../../../components/adverts/fields/interestTag/InterestTag";
import AttachmentCard from "../../../components/adverts/fields/attachmentCard/AttachmentCard";
import ContactsGrid from "../../../components/adverts/fields/contactsGrid/ContactsGrid";
import { useCreateOrderMutation } from "../../../features/api/extensions/ordersApiExtension";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../../../components/review/card/ReviewCard";
import { Review } from "../../../models/api/review";

export default function AdvertsDetails() {
  const navigate = useNavigate();
  const query = useQuery() as any;
  const advertId: number = +query.get("id");
  const { data: advert } = useGetAdvertByIdQuery(advertId);
  const { data: reviews } = useGetAdvertReviewsQuery({ id: advertId });

  const [createOrder] = useCreateOrderMutation();
  const orderClick = () => {
    const createOrderAction = createOrder({ advertId });

    createOrderAction.then((response) => {
      navigate("/adverts/my/orders");
    });
  };

  return (
    <>
      {!!advert ? (
        <div className="details">
          <Paper className="details__body">
            <div className="paper details__content">
              <div className="details__content__header">
                <GoalTag goal={advert.goal} />
                <InterestTag interest={advert.interest} />
              </div>

              <div className="details__content__title">{advert.title}</div>
              <div className="details__content__properties">
                {advert.category.name}
              </div>
              <div className="details__content__country">
                {advert.city.country.name}, {advert.city.name}
              </div>
              {advert.description ? (
                <div className="details__content__description">
                  {advert.description}
                </div>
              ) : (
                <></>
              )}
              <ContactsGrid contacts={advert.contacts} />
            </div>
            {advert.attachments.length > 0 ? (
              <div className="paper details__attachments">
                {advert.attachments.map((attachment, index) => (
                  <AttachmentCard key={index} attachment={attachment} />
                ))}
              </div>
            ) : (
              <></>
            )}
          </Paper>
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
                  onClick={orderClick}
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
