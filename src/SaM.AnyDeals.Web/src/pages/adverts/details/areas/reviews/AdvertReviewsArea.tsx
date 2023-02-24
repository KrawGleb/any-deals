import React, { useEffect, useState } from "react";
import "./AdvertReviewsArea.scss";
import { useGetAdvertReviewsQuery } from "../../../../../features/api/extensions/advertsApiExtension";
import { Paper, Typography } from "@mui/material";
import ReviewCard from "../../../../../components/review/card/ReviewCard";
import { Review } from "../../../../../models/api/review";

export default function AdvertReviewsArea({ id }: { id: number }) {
  const { data: reviews } = useGetAdvertReviewsQuery({ id });

  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [lowerGroup, setLowerGroup] = useState<Review[]>([]);
  const [middleGroup, setMiddleGroup] = useState<Review[]>([]);
  const [upperGroup, setUpperGroup] = useState<Review[]>([]);

  useEffect(() => {
    if (!reviews) return;

    setAllReviews(reviews);
    setLowerGroup(reviews.filter((r) => r.grade <= 3));
    setMiddleGroup(reviews.filter((r) => r.grade >= 4 && r.grade <= 7));
    setUpperGroup(reviews.filter((r) => r.grade >= 8));
  }, [reviews]);

  return allReviews.length > 0 ? (
    <Paper className="advert-details__reviews__area">
      {lowerGroup.length > 0 ? (
        <div className="advert-details__reviews__column advert-details__reviews__lower">
          {lowerGroup.map((r, key) => (
            <ReviewCard key={key} review={r} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {middleGroup.length > 0 ? (
        <div className="advert-details__reviews__column advert-details__reviews__middle">
          {middleGroup.map((r, key) => (
            <ReviewCard key={key} review={r} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {upperGroup.length > 0 ? (
        <div className="advert-details__reviews__column advert-details__reviews__upper">
          {upperGroup.map((r, key) => (
            <ReviewCard key={key} review={r} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Paper>
  ) : (
    <Typography variant="h5">There isn't any reviews yet</Typography>
  );
}
