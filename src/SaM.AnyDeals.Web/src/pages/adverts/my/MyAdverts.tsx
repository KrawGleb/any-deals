import React from "react";
import "./MyAdverts.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetMyAdvertsQuery } from "../../../features/api/extensions/advertsApiExtension";
import AdvertsList from "../../../components/common/advertsList/AdvertsList";

export default function MyAdverts() {
  const { data: myAdverts } = useGetMyAdvertsQuery();

  return (
    <div className="my">
      <div className="row">
        <div className="create_btn">
          <Button variant="contained" sx={{ padding: 0 }}>
            <Link to="/adverts/new" className="link">
              Create new
            </Link>
          </Button>
        </div>
      </div>
      <AdvertsList
        allowEditing={true}
        adverts={myAdverts ?? []}
        styles={{ height: "80vh" }}
      />
    </div>
  );
}
