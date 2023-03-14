import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrdersList from "../../../../components/orders/list/OrdersList";
import GoalTabs from "../../../../components/search/filters/GoalTabs";
import { useGetMyRequestsQuery } from "../../../../features/api/extensions/ordersApiExtension";
import { Order } from "../../../../models/api/order";
import OrderAccordion from "../../../../components/orders/accordion/OrderAccordion";

export default function Executions() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [archivated, setArchivated] = useState(false);
  const { data: requests } = useGetMyRequestsQuery({ archivated });
  const onCardClick = (order: Order) =>
    navigate(`/orders/details?id=${order.id}`);

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    setArchivated(newTab === 1);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "1rem 5.5rem",
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
