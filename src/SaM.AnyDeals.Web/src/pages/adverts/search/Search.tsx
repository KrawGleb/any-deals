import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import AdvertsList from "../../../components/common/advertsList/AdvertsList";
import Filters from "../../../components/search/filters/Filters";
import { useSearchAdvertsQuery } from "../../../features/api/extensions/advertsApiExtension";
import { RootState } from "../../../features/store/store";

export default function Search() {
  const filters = useSelector((state: RootState) => state.filters);
  const { data: adverts } = useSearchAdvertsQuery({ ...filters });

  console.log(adverts);

  return (
    <>
      <Filters />
      <Box sx={{ paddingTop: "10px" }}>
        <AdvertsList
          adverts={adverts ?? []}
          allowEditing={false}
          styles={{ height: "60vh" }}
        />
      </Box>
    </>
  );
}
