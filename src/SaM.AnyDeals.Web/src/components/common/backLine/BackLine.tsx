import React from "react";
import "./BackLine.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackLine({ link }: { link: string }) {
  const navigate = useNavigate();

  return (
    <div className="back-line">
      <div className="line" onClick={() => navigate(link)}>
        <div className="row">
          <ArrowBackIcon />
        </div>
        <p className="row nav-text prevent-select">Back</p>
      </div>
    </div>
  );
}
