import React from "react";
import "./MyAdverts.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function MyAdverts() {
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
    </div>
  );
}
