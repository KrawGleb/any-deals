import React from "react";
import { useGetMyAdvertsQuery } from "../../../features/api/advertsApi";
import useQuery from "../../../features/hooks/useQuery";
import AdvertForm from "../../../components/adverts/form/AdvertForm";

export default function EditAdvert() {
  const query = useQuery() as any;
  const advertId: number = +query.get("id");
  const { data: adverts } = useGetMyAdvertsQuery();
  const advert = adverts?.find((a) => a.id === advertId);

  return <AdvertForm advert={advert} />;
}
