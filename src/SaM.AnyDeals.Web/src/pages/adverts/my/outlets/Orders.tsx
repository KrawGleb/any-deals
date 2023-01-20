import React from "react";
import { useNavigate } from "react-router-dom";
import OrdersList from "../../../../components/orders/list/OrdersList";
import { useGetMyOrdersQuery } from "../../../../features/api/extensions/ordersApiExtension";
import { Order } from "../../../../models/api/order";

export default function Orders() {
  const navigate = useNavigate();
  const { data: orders } = useGetMyOrdersQuery();
  const onCardClick = (order: Order) =>
    navigate(`/orders/details?id=${order.id}`);

  return <OrdersList onCardClick={onCardClick} orders={orders ?? []} />;
}
