import React from "react";
import { useSelector } from "react-redux";
import AdvertsList from "../../../components/common/advertsList/AdvertsList";
import Filters from "../../../components/search/filters/Filters";
import { useSearchAdvertsQuery } from "../../../features/api/extensions/advertsApiExtension";
import { mapAdvert } from "../../../features/helpers/mappers";
import { RootState } from "../../../features/store/store";

export default function Search() {
  const filters = useSelector((state: RootState) => state.filters);
  const { data: adverts } = useSearchAdvertsQuery({ ...filters });
  const mappedAdverts = adverts?.map((advert) => mapAdvert(advert)) ?? [];

  return (
    <>
      <Filters />;
      <AdvertsList adverts={mappedAdverts} allowEditing={false} />
    </>
  );
}
