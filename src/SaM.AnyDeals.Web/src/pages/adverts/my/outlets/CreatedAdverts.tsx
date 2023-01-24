import React from "react";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../../components/adverts/list/AdvertsList";
import { useGetMyAdvertsQuery } from "../../../../features/api/extensions/advertsApiExtension";

export default function CreatedAdverts() {
  const navigate = useNavigate();
  const { data: myAdverts } = useGetMyAdvertsQuery();
  const onCardClick = (id: number) => navigate(`/adverts/edit?id=${id}`);

  return (
    <AdvertsList
      onCardClick={onCardClick}
      adverts={myAdverts ?? []}
      showStatus={true}
    />
  );
}
