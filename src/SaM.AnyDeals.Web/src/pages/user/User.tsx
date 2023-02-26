import "./User.scss";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../features/api/extensions/usersApiExtension";
import { ApplicationUserDetails } from "../../models/api/applicationUserDetails";
import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import BackLine from "../../components/common/backLine/BackLine";
import AdvertsList from "../../components/adverts/list/AdvertsList";

export default function User() {
  const navigate = useNavigate();
  const routeParams = useParams();

  if (!routeParams.username) {
    navigate("/");
  }

  const { data: userDetailsResponse } = useGetUserDetailsQuery(
    routeParams.username!
  );

  const userDetails: ApplicationUserDetails | undefined =
    userDetailsResponse?.body;

  return (
    <Box className="user-details__container">
      <BackLine link="/" />
      <Paper className="user-details__header">
        <Box className="user-details__header__person">
          <img src="https://via.placeholder.com/150" alt="" />
        </Box>

        <Box className="user-details__header__info">
          <Typography variant="h5" textAlign="right">
            {userDetails?.user.userName}
          </Typography>
          <Typography variant="subtitle2" color="gray" textAlign="right">
            {userDetails?.user.email}
          </Typography>
        </Box>
        <Grid
          container
          spacing={0.5}
          rowSpacing={0.5}
          columnSpacing={0.5}
          className="user-details__header__rating"
        >
          {userDetails?.averageRatingDescriptions.map((desc) => (
            <Grid item className="rating__description">
              <Typography>{desc.category}</Typography>
              <Rating max={10} value={desc.averageRating} readOnly />
              <Typography>{`(${desc.reviewsCount})`}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box className="user-details__adverts">
        <AdvertsList
          adverts={userDetails?.adverts ?? []}
          onCardClick={(id: number) => navigate(`/adverts/details?id=${id}`)}
        />
      </Box>
    </Box>
  );
}
