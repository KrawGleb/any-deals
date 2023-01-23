import React from "react";
import "./ReviewCard.scss";
import { Paper, Rating } from "@mui/material";
import { Review } from "../../../models/api/review";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Paper className="review__card">
      <div className="review__card__header">
        <div className="review__card__header__info">
          <p className="review__card__header__info__author">{review.author?.userName}</p>
          <p>{new Date(review.createdAt!).toLocaleString()}</p>
        </div>
        <div className="review__card__header__grade">
          <Rating max={10} value={review.grade} readOnly />
        </div>
      </div>
      <div className="review__card__title">{review.title}</div>
      <div className="review__card__comment">{review.comment}</div>
    </Paper>
  );
}
