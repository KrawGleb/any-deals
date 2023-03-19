import "./OrdersList.scss";
import React from "react";
import { Box, Stack } from "@mui/material";
import { OrdersListProps } from "./OrdersListProps";
import OrderAccordion from "../accordion/OrderAccordion";
import { Order } from "../../../models/api/order";

export default function OrdersList({ orders, onCardClick }: OrdersListProps) {
  const groupedByAdverts =
    orders?.reduce((acc: any, curr) => {
      const advertId = curr.advert?.id as keyof typeof acc;
      if (!acc[advertId]) {
        acc[advertId] = [];
      }

      (acc[advertId] as any).push(curr);
      return acc;
    }, {}) ?? {};

  return (
    <Box className="orders-list__root">
      <Stack className="orders-list__component" spacing={2}>
        {Object.values(groupedByAdverts).map((groupedOrders, index) => (
          <OrderAccordion
            key={index}
            orders={groupedOrders as Order[]}
            onCardClick={onCardClick}
          />
        ))}
      </Stack>
    </Box>
  );
}
