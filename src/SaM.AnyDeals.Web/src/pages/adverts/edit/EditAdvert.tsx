import React from "react";
import {
  useGetAdvertByIdQuery,
  useGetMyAdvertsQuery,
} from "../../../features/api/extensions/advertsApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import AdvertForm from "../../../components/adverts/form/AdvertForm";
import { RootState } from "../../../features/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditAdvert() {
  const navigate = useNavigate();
  const query = useQuery() as any;
  const advertId: number = +query.get("id");
  const authState = useSelector((state: RootState) => state.auth);
  const { data: adverts } = useGetMyAdvertsQuery();
  const { data: advert } = useGetAdvertByIdQuery(advertId);

  if (!(adverts?.find((a) => a.id === advertId) || authState.isAdmin)) {
    navigate("/my");
  }

  return <AdvertForm advert={advert} />;
}
