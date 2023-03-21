import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../../components/adverts/list/AdvertsList";
import { useGetMyAdvertsQuery } from "../../../../features/api/extensions/advertsApiExtension";
import { setMyTab } from "../../../../features/store/slices/tabsSlice";

export default function CreatedAdverts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: myAdverts } = useGetMyAdvertsQuery();
  const onCardClick = (id: number) => navigate(`/adverts/edit?id=${id}`);

  useEffect(() => {
    dispatch(setMyTab(0));
  }, [dispatch]);

  return (
    <AdvertsList
      onCardClick={onCardClick}
      adverts={myAdverts ?? []}
      showStatus={true}
    />
  );
}
