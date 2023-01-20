import React from "react";
import { useNavigate } from "react-router-dom";
import OrdersList from "../../../../components/orders/list/OrdersList";
import { useGetMyRequestsQuery } from "../../../../features/api/extensions/ordersApiExtension";
import { Order } from "../../../../models/api/order";

export default function Execution() {
  const navigate = useNavigate();
  const { data: requests } = useGetMyRequestsQuery();
  const onCardClick = (order: Order) =>
    navigate(`/orders/details?id=${order.id}`);

  return <OrdersList onCardClick={onCardClick} orders={requests ?? []} />;
}
