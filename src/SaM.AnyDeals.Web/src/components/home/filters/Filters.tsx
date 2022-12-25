import "./Filters.scss";
import { Paper, Tabs, Box, Typography, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { SyntheticEvent, useState } from "react";
import TypeTab from "../../common/type-tabs/TypeTab";
import { FiltersTextField } from "./text-field/FiltersTextField";
import SearchIcon from "@mui/icons-material/Search";

export default function Filters() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className="filters">
      <div className="filters__root">
        <Tabs value={value} onChange={handleChange}>
          <TypeTab label="Services nearby" />
          <TypeTab label="Online services" />
          <TypeTab label="Places and events" />
        </Tabs>

        <form className="filters__fields">
          <Box className="country">
            <div className="country-select">
              <Box className="country-select__content">
                <Typography className="country-select__content-text">
                  Country
                </Typography>
                <ArrowDropDownIcon className="country-select__icon" />
              </Box>
            </div>
            <div className="location-select">
              <Box className="location-select__content">
                <Typography className="location-select__content-text">
                  City
                </Typography>
                <ArrowDropDownIcon className="location-select__icon" />
              </Box>
            </div>
          </Box>
          <Box className="category">
            <div className="category-select">
              <Box className="category-select__content">
                <Typography className="category-select__content-text">
                  Category
                </Typography>
                <ArrowDropDownIcon className="category-select__icon" />
              </Box>
            </div>
          </Box>
          <Box className="text">
            <FiltersTextField label="Text in advert"></FiltersTextField>
            <Button
              variant="contained"
              sx={{ minWidth: "8rem", borderRadius: "10px" }}
              endIcon={<SearchIcon />}
            >
              Search{" "}
            </Button>
          </Box>
        </form>
      </div>
    </Paper>
  );
}
