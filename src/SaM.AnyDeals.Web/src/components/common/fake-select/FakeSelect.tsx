import "./FakeSelect.scss";
import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function FakeSelect({ ...props }) {
  return (
    <Box className="fake-select" {...props}>
      <div className="fake-select-input">
        <Box className="fake-select-input__content">
          <Typography className="fake-select-input__content-text">
            {props.label}
            {props.required ? " *" : " "}
          </Typography>
          <ArrowDropDownIcon className="fake-select-input__icon" />
        </Box>
      </div>
    </Box>
  );
}
