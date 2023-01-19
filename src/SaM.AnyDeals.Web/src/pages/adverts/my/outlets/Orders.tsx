import React from "react";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../../components/adverts/list/AdvertsList";
import { useGetMyOrdersQuery } from "../../../../features/api/extensions/ordersApiExtension";

export default function Orders() {
  const navigate = useNavigate();
  const { data: orders } = useGetMyOrdersQuery();
  const onCardClick = (id: number) => navigate(`/orders/details?id=${id}`);

  return (
    <AdvertsList
      onCardClick={onCardClick}
      adverts={orders?.map((o) => o.advert) ?? []}
      styles={{ height: "80vh" }}
    />
  );
}
