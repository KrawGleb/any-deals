import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import AdvertsList from "../../../components/adverts/list/AdvertsList";
import { useSearchAdvertsQuery } from "../../../features/api/extensions/advertsApiExtension";
import { Advert } from "../../../models/api/advert";
import { SearchAdvertsParams } from "../../../models/searchAdvertsParams";

export default function ModerationAdverts() {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [currentAdverts, setCurrentAdverts] = useState<Advert[]>([]);

  const onCardClick = (id: number) => navigate(`/adverts/edit?id=${id}`);

  const searchParams: SearchAdvertsParams = {
    page,
    pageSize: 1,
    status: 0,
  };
  const { data: adverts } = useSearchAdvertsQuery({ ...searchParams });

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (adverts === undefined) return;

    console.log(adverts);
    const newAdverts: Advert[] =
      adverts?.filter(
        (add: Advert) =>
          currentAdverts.findIndex((currAdd) => currAdd.id === add.id) === -1
      ) ?? [];

    console.log(newAdverts);

    if (newAdverts.length === 0) {
      setHasMore(false);
    } else {
      nextPage();
      setHasMore(true);
      setCurrentAdverts((curr) => [...curr, ...newAdverts]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adverts]);

  return (
    <InfiniteScroll
      dataLength={currentAdverts.length}
      next={nextPage}
      loader={<h4>Loading...</h4>}
      hasMore={hasMore}
    >
      <AdvertsList adverts={currentAdverts} onCardClick={onCardClick} />
    </InfiniteScroll>
  );
}
