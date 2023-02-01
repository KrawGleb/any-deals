import "./Search.scss";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../components/adverts/list/AdvertsList";
import Filters from "../../../components/search/filters/Filters";
import { useSearchAdvertsQuery } from "../../../features/api/extensions/advertsApiExtension";
import { setPageFilter } from "../../../features/store/slices/filtersSlice";
import {
  addAdverts,
  setAdverts,
} from "../../../features/store/slices/searchSlice";
import { RootState } from "../../../features/store/store";
import { Advert } from "../../../models/api/advert";

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const currentPage = useSelector((state: RootState) => state.filters.page);

  const [hasMore, setHasMore] = useState(true);

  const currentAdverts = useSelector(
    (state: RootState) => state.searchSlice.adverts
  );
  let { data: adverts } = useSearchAdvertsQuery({ ...filters });

  const onCardClick = (id: number) => navigate(`/adverts/details?id=${id}`);

  const nextPage = () => {
    dispatch(setPageFilter(currentPage + 1));
  };

  useEffect(() => {
    if (adverts === undefined) return;

    if (currentPage === 1) {
      dispatch(setAdverts(adverts ?? []));
      setHasMore(!!adverts);
      nextPage();
      return;
    }

    const newAdverts: Advert[] =
      adverts?.filter(
        (add) =>
          currentAdverts.findIndex((currAdd) => currAdd.id === add.id) === -1
      ) ?? [];

    if (newAdverts.length === 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
      dispatch(addAdverts(newAdverts));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adverts]);

  return (
    <>
      <div className="extra-spacer">
        <Filters />
      </div>
      <Box sx={{ paddingTop: "10px" }}>
        <InfiniteScroll
          dataLength={currentAdverts.length}
          next={nextPage}
          loader={<h4>Loading...</h4>}
          hasMore={hasMore}
        >
          <AdvertsList adverts={currentAdverts} onCardClick={onCardClick} />
        </InfiniteScroll>
      </Box>
    </>
  );
}
