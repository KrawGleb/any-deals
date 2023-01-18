import "./Moderation.scss";
import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import NavTab from "../../components/moderation/navTab/NavTab";
import { Outlet, useNavigate } from "react-router-dom";

export default function Moderation() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  useEffect(() => {
    navigate("adverts");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="moderation-root">
      <div className="moderation-root__back-line">Back line</div>
      <Paper className="moderation-root__content moderation-content">
        <Grid container className="moderation-content">
          <Grid item className="moderation-content__nav">
            <Tabs orientation="vertical" value={tab} onChange={handleChange}>
              <NavTab
                label="Adverts"
                value={0}
                onClick={() => navigate("adverts")}
              />
              <NavTab
                label="Categories"
                value={1}
                onClick={() => navigate("categories")}
              />
            </Tabs>
          </Grid>
          <Grid item className="moderation-content__body">
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
