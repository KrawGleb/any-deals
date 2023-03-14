import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import "./About.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { setHeaderTab } from "../../features/store/slices/tabsSlice";
import { useDispatch } from "react-redux";

export default function About() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTab(2));
  }, [dispatch]);

  return (
    <Paper className="about">
      <Box className="about__header">
        <Box marginBottom="20px">
          <Typography className="about__title" variant="h3" align="center">
            Any Deals
          </Typography>
        </Box>

        <Box
          borderLeft={3}
          borderColor="grey.500"
          width="46%"
          paddingLeft="10px"
          className="about__quote"
        >
          <Typography
            variant="h6"
            align="left"
            color="text.secondary"
            paddingRight="5px"
            paragraph
          >
            The biggest challenge of the 21st century is to offer opportunities
            for all humans to develop their full potential, unhampered by
            discrimination based on race, gender, religion, ethnicity or social
            status.
          </Typography>
          <Typography
            variant="h6"
            align="left"
            color="gray"
            paddingRight="5px"
            paragraph
          >
            - Ban Ki-moon
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 6 }}>
        <Typography variant="subtitle1" textAlign="center">
          Our web project is designed to help people post ads that will be
          visible to other users. We understand that finding information about
          products, services, or opportunities can be difficult, especially if
          you have just moved to a new country or region.
        </Typography>
        <Typography variant="subtitle1" textAlign="center" marginTop="5px">
          On our platform, you can post ads about selling goods, services, job
          or housing searches, as well as requests for help or just
          communication with people who are in similar situations.
        </Typography>
        <Typography variant="subtitle1" textAlign="center" marginTop="5px">
          Users can browse ads and contact authors if they are interested in the
          offer. In addition, our web project provides sorting and filtering
          features for ads based on various parameters. This allows users to
          quickly and efficiently find the information they need.
        </Typography>
        <Typography variant="subtitle1" textAlign="center" marginTop="5px">
          We believe that our web project will help people save time and effort
          in finding the information they need, as well as connect users for
          mutual benefit. We hope that our platform will be a useful tool for
          anyone looking for an effective way to post ads and receive responses
          from other users.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Search ads
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
