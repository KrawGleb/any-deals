import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrdersList from "../../../../components/orders/list/OrdersList";
import GoalTabs from "../../../../components/search/filters/GoalTabs";
import { useGetMyRequestsQuery } from "../../../../features/api/extensions/ordersApiExtension";
import { Order } from "../../../../models/api/order";
import { useDispatch } from "react-redux";
import { setMyTab } from "../../../../features/store/slices/tabsSlice";

export default function Executions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [archivated, setArchivated] = useState(false);
  const { data: requests } = useGetMyRequestsQuery({ archivated });
  const onCardClick = (order: Order) =>
    navigate(`/orders/details?id=${order.id}`);

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    setArchivated(newTab === 1);
  };

  useEffect(() => {
    dispatch(setMyTab(2));
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "1170px",
        }}
      >
        <GoalTabs value={tab} onChange={handleChange}>
          <Tab value={0} disableRipple label="Available" />
          <Tab value={1} disableRipple label="Archivated" />
        </GoalTabs>
      </Box>
      <OrdersList onCardClick={onCardClick} orders={requests ?? []} />;
    </div>
  );
}
