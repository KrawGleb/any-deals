import "./ReviewDialog.scss";
import React, { useState } from "react";
import * as yup from "yup";
import { Box, Button, Dialog, Rating, Typography } from "@mui/material";
import { ReviewDialogProps } from "./ReviewDialogProps";
import Input from "../../common/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Review } from "../../../models/api/review";

const schema = yup.object().shape({
  title: yup.string().label("Title").required().max(100),
  comment: yup.string().label("Comment").max(1000),
});

export default function ReviewDialog({
  open,
  handleCancel,
  handleSubmit: handleReviewSubmit,
}: ReviewDialogProps) {
  const [grade, setGrade] = useState<number | null>(0);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const review: Review = {
      ...data,
      grade,
    };

    handleReviewSubmit(review);
  };

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit(onSubmit, onSubmit)}>
        <Box className="review-dialog">
          <Typography variant="h5" textAlign="center">
            Review
          </Typography>
          <Input
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors?.title?.message}
          />
          <Rating
            max={10}
            value={grade}
            onChange={(_event, newGrade) => setGrade(newGrade)}
          />
          <Input
            label="Comment"
            multiline
            rows={4}
            {...register("comment")}
            error={!!errors.comment}
            helperText={errors?.comment?.message}
          />
          <Box className="review-dialog__actions">
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={!isDirty || !isValid}
            >
              Submit and continue
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
}
