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
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const { data: adverts } = useGetMyAdvertsQuery();
  const { data: advert } = useGetAdvertByIdQuery(advertId);

  // TODO: Check user's roles
  // if (!(adverts?.find((a) => a.id === advertId) || userInfo.isAdmin)) {
  //   navigate("/my");
  // }

  if (!adverts?.find((a) => a.id === advertId)) {
    navigate("/my");
  }

  return <AdvertForm advert={advert} />;
}
