import React, { useEffect, useState } from "react";
import "./MyAdverts.scss";
import { Button, Grid } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import VerticalTabs from "../../../components/common/verticalTabs/VerticalTabs";
import VerticalTab from "../../../components/common/verticalTabs/VerticalTab";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderTab } from "../../../features/store/slices/tabsSlice";
import { RootState } from "../../../features/store/store";

export default function MyAdverts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const tabsState = useSelector((state: RootState) => state.tabs);

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  useEffect(() => {
    dispatch(setHeaderTab(1));
  }, [dispatch]);

  useEffect(() => {
    setTab(tabsState.myTab);
  }, [tabsState]);

  return (
    <div className="my">
      <div className="row">
        <div className="create_btn">
          <Button variant="contained" sx={{ padding: 0 }}>
            <Link to="/adverts/new" className="link">
              Create new
            </Link>
          </Button>
        </div>
      </div>
      <Grid container className="my-lists__root">
        <Grid item className="my-lists__nav">
          <VerticalTabs value={tab} onChange={handleChange}>
            <VerticalTab label="My" value={0} onClick={() => navigate("")} />
            <VerticalTab
              label="Orders"
              value={1}
              onClick={() => navigate("orders")}
            />
            <VerticalTab
              label="Execution"
              value={2}
              onClick={() => navigate("execution")}
            />
          </VerticalTabs>
        </Grid>
        <Grid item className="my-lists__body">
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}
