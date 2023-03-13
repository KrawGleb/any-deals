import "./User.scss";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../features/api/extensions/usersApiExtension";
import { ApplicationUserDetails } from "../../models/api/applicationUserDetails";
import { Box, Paper, Rating, Typography } from "@mui/material";
import BackLine from "../../components/common/backLine/BackLine";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import Grid from "@mui/material/Unstable_Grid2";
import AdvertsList from "../../components/adverts/list/AdvertsList";
import Placeholder from "../../components/common/placeholder/Placeholder";
import AnimatedBox from "../../components/common/animated/box/AnimatedBox";

const preparedColors = ["#8A2BE2", "#FF69B4", "#00CED1", "#FFA500", "#32CD32"];

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

  const totalAdvertsCount = userDetails?.adverts.length ?? 0;
  const groupedByCategory =
    userDetails?.adverts.reduce((acc, curr) => {
      const key = curr.category.name as keyof typeof acc;
      if (!acc[key]) {
        (acc[key] as any) = [];
      }

      (acc[key] as any).push(curr);
      return acc;
    }, {}) ?? {};

  const radialBarChartData: any[] = [];
  Object.keys(groupedByCategory!).forEach((key) => {
    const categoryAdverts =
      (groupedByCategory![key as keyof typeof groupedByCategory] as any[]) ??
      [];
    const categoryAdvertsCount = categoryAdverts.length;
    const percents = categoryAdvertsCount / totalAdvertsCount;

    radialBarChartData.push({
      name: key,
      value: percents.toFixed(2),
    });
  });
  const topFiveFromDataWithColors = radialBarChartData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((v, index) => ({ ...v, fill: preparedColors[index] }));

  console.log(topFiveFromDataWithColors);

  return (
    <Box className="user-details__container">
      <BackLine link="/" />
      <Box className="user-details__box">
        <Box className="user-details__body">
          <Paper className="user-details__body__rating">
            <Typography
              className="user-details__body__rating__title"
              variant="h5"
              fontWeight="bold"
            >
              Ratings
            </Typography>
            <Box className="user-details__body__rating__body">
              {userDetails?.averageRatingDescriptions &&
              userDetails?.averageRatingDescriptions.length > 0 ? (
                <Box>
                  <Grid container columnGap={2} rowGap={1}>
                    {userDetails?.averageRatingDescriptions.map((desc) => (
                      <Grid className="user-details__body__rating__body__item">
                        <Typography>{desc.category}</Typography>
                        <Rating max={10} value={desc.averageRating} readOnly />
                        <Typography>{`(${desc.reviewsCount})`}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Box className="user-details__body__rating__empty">
                  <Placeholder />
                </Box>
              )}

              <RadialBarChart
                cx={"50%"}
                cy={"50%"}
                width={280}
                height={100}
                innerRadius="20%"
                outerRadius="100%"
                data={topFiveFromDataWithColors}
                startAngle={90}
                endAngle={270}
              >
                <RadialBar background dataKey="value" />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    top: "50%",
                    right: 0,
                    transform: "translate(0, -50%)",
                    lineHeight: "24px",
                    fontSize: "12px",
                  }}
                />
              </RadialBarChart>
            </Box>
          </Paper>
          <Paper className="user-details__body__adverts">
            <Typography
              className="user-details__body__adverts__title"
              variant="h5"
              fontWeight="bold"
            >
              Adverts
            </Typography>
            <AdvertsList
              adverts={userDetails?.adverts ?? []}
              onCardClick={(id: number) =>
                navigate(`/adverts/details?id=${id}`)
              }
            />
          </Paper>
        </Box>

        <Box className="user-details__sidebar">
          <Box className="user-details__sidebar__header">
            <img src="https://via.placeholder.com/150" alt="" />
          </Box>

          <Paper className="user-details__sidebar__body">
            <AnimatedBox delay={0.1}>
              <Typography variant="h5" fontWeight="bold">
                {userDetails?.user.userName}
              </Typography>
            </AnimatedBox>
            <AnimatedBox delay={0.2}>
              <Typography variant="subtitle2" color="gray">
                {userDetails?.user.email}
              </Typography>
            </AnimatedBox>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
