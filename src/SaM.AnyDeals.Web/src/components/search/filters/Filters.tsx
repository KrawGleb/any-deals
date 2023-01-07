import "./Filters.scss";
import {
  Tabs,
  Box,
  Typography,
  Button,
  Tab,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { SyntheticEvent, useState } from "react";
import TypeTab from "../../common/typeTabs/TypeTab";
import { FiltersTextField } from "./textField/FiltersTextField";
import SearchIcon from "@mui/icons-material/Search";
import TypeTabs from "./typeTabs/TypeTabs";
import FormatButton from "./format/FormatButton";

export default function Filters() {
  const [subCategory, setSubCategory] = useState(0);
  const [type, setType] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCommercial, setIsCommercial] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSocial, setIsSocial] = useState(false);
  const [formats, setFormats] = useState(() => []);

  const handleSubCategoryChange = (event: SyntheticEvent, newValue: number) =>
    setSubCategory(newValue);

  const handleTypeChange = (event: SyntheticEvent, newValue: number) =>
    setType(newValue);

  const handleFormatsChange = (event: SyntheticEvent, newFormats: []) =>
    setFormats(newFormats);

  return (
    <Box className="filters">
      <div className="filters__root">
        <Tabs value={subCategory} onChange={handleSubCategoryChange}>
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
              Search
            </Button>
          </Box>
        </form>

        <Box className="type-buttons">
          <TypeTabs value={type} onChange={handleTypeChange}>
            <Tab disableRipple label="Offers" />
            <Tab disableRipple label="Requests" />
            <Tab disableRipple label="All" />
          </TypeTabs>
          <ToggleButtonGroup
            className="toggle-buttons"
            value={formats}
            onChange={handleFormatsChange}
          >
            <FormatButton value="commercial">Commercial</FormatButton>
            <FormatButton value="social">Social</FormatButton>
          </ToggleButtonGroup>
        </Box>
      </div>
    </Box>
  );
}
