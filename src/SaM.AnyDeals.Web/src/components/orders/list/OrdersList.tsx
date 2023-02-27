import "./OrdersList.scss";
import React from "react";
import { Box, Stack } from "@mui/material";
import OrderCard from "../card/OrderCard";
import { OrdersListProps } from "./OrdersListProps";

export default function OrdersList({ orders, onCardClick }: OrdersListProps) {
  console.log(orders);

  return (
    <Box className="orders-list__root">
      <Stack className="orders-list__component" spacing={2}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} onClick={onCardClick} />
        ))}
      </Stack>
    </Box>
  );
}
