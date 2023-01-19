import React from "react";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../../components/adverts/list/AdvertsList";
import { useGetMyRequestsQuery } from "../../../../features/api/extensions/ordersApiExtension";

export default function Execution() {
  const navigate = useNavigate();
  const { data: requests } = useGetMyRequestsQuery();
  const onCardClick = (id: number) => navigate(`/orders/details?id=${id}`);

  return (
    <AdvertsList
      onCardClick={onCardClick}
      adverts={requests?.map((o) => o.advert) ?? []}
      styles={{ height: "80vh" }}
    />
  );
}
