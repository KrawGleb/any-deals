import "./Filters.scss";
import { Tabs, Box, Button, Tab, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import TypeTab from "../../common/typeTabs/TypeTab";
import SearchIcon from "@mui/icons-material/Search";
import TypeTabs from "./typeTabs/TypeTabs";
import FormatButton from "./format/FormatButton";
import { Country } from "../../../models/api/country";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../features/api/extensions/countriesApiExtension";
import { SelectableItem } from "../../../models/selectableItem";
import { City } from "../../../models/api/city";
import { useGetCategoriesQuery } from "../../../features/api/extensions/categoriesApiExtension";
import { Category } from "../../../models/api/category";
import SelectDialog from "../../common/selectDialog/SelectDialog";
import FakeSelect from "../../common/fakeSelect/FakeSelect";
import Input from "../../common/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryFilter,
  setCityFilter,
  setCountryFilter,
  setGoalFilter,
  setGroupFilter,
  setInterestFilter,
  setPageFilter,
  setTitleFilter,
} from "../../../features/store/filtersSlice";
import { RootState } from "../../../features/store/store";

export default function Filters() {
  const dispatch = useDispatch();
  const group = useSelector((state: RootState) => state.filters.group);
  const [localInterest, setLocalInterest] = useState<number[]>([]);
  const [localGoal, setLocalGoal] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const filters = useSelector((state: RootState) => state.filters);

  const setInterest = (value: number[]) => {
    setLocalInterest(value);

    value.length === 1
      ? dispatch(setInterestFilter(value[0]))
      : dispatch(setInterestFilter(undefined));
  };

  const setGoal = (value: number) => {
    setLocalGoal(value);
    dispatch(setGoalFilter(value === 2 ? undefined : value));
    dispatch(setPageFilter(1));
  };

  const { data: countries } = useGetCountriesQuery();
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const handleSelectCountryDialogClose = (value?: SelectableItem) => {
    setIsCountrySelectOpen(false);
    setSelectedCountry(value as Country);
    setSelectedCity(undefined);

    dispatch(setCountryFilter(value?.name));
    dispatch(setCityFilter(undefined));
  };

  const { data: cities } = useGetCitiesQuery(selectedCountry?.id ?? -1);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | undefined>();
  const handleSelectCityDialogClose = (value?: SelectableItem) => {
    setIsCitySelectOpen(false);
    setSelectedCity(value as City);

    dispatch(setCityFilter(value?.name));
  };

  const { data: categories } = useGetCategoriesQuery();
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const handleSelectCategoryDialogClose = (value?: SelectableItem) => {
    setIsCategorySelectOpen(false);
    setSelectedCategory(value as Category);

    dispatch(setCategoryFilter(value?.name));
  };

  useEffect(() => {
    setLocalInterest((_curr) => (filters.interest ? [filters.interest] : []));
    setLocalGoal(filters.goal ?? 2);
    setTitle(filters.title);

    if (filters.country)
      setSelectedCountry({
        id: -1,
        name: filters.country,
      });
    if (filters.city)
      setSelectedCity({
        id: -1,
        name: filters.city,
      } as City);
    if (filters.category)
      setSelectedCategory({
        id: -1,
        name: filters.category,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchClick = () => {
    dispatch(setTitleFilter(title));
  };

  return (
    <>
      <SelectDialog
        open={isCountrySelectOpen}
        onClose={handleSelectCountryDialogClose}
        selectedValue={selectedCountry as SelectableItem}
        variants={(countries as SelectableItem[]) ?? []}
      />
      <SelectDialog
        open={isCitySelectOpen}
        onClose={handleSelectCityDialogClose}
        selectedValue={selectedCity as SelectableItem}
        variants={(cities as SelectableItem[]) ?? []}
      />
      <SelectDialog
        open={isCategorySelectOpen}
        onClose={handleSelectCategoryDialogClose}
        selectedValue={selectedCategory as SelectableItem}
        variants={(categories as SelectableItem[]) ?? []}
      />

      <Box className="filters">
        <div className="filters__root">
          <Tabs
            value={group}
            onChange={(__: any, value: number) => {
              dispatch(setGroupFilter(value));
              dispatch(setPageFilter(1));
            }}
          >
            <TypeTab value={0} label="Services nearby" />
            <TypeTab value={1} label="Online services" />
            <TypeTab value={2} label="Places and events" />
          </Tabs>

          <form className="filters__fields">
            <FakeSelect
              required
              label="Country"
              value={selectedCountry?.name ?? ""}
              onClick={() => setIsCountrySelectOpen(true)}
            />
            <FakeSelect
              required
              label="City"
              value={selectedCity?.name ?? ""}
              onClick={() => setIsCitySelectOpen(true)}
            />
            <FakeSelect
              required
              label="Category"
              value={selectedCategory?.name ?? ""}
              onClick={() => setIsCategorySelectOpen(true)}
            />
            <Box className="text">
              <Input
                label="Text in advert"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              ></Input>
              <Button
                variant="contained"
                sx={{ minWidth: "8rem", borderRadius: "10px" }}
                endIcon={<SearchIcon />}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Box>
          </form>

          <Box className="type-buttons">
            <TypeTabs
              value={localGoal}
              onChange={(__: any, value: number) => setGoal(value)}
            >
              <Tab value={0} disableRipple label="Requests" />
              <Tab value={1} disableRipple label="Offers" />
              <Tab value={2} disableRipple label="All" />
            </TypeTabs>
            <ToggleButtonGroup
              className="toggle-buttons"
              value={localInterest}
              onChange={(__: any, value: number[]) => setInterest(value)}
            >
              <FormatButton value={0}>Commercial</FormatButton>
              <FormatButton value={1}>Social</FormatButton>
            </ToggleButtonGroup>
          </Box>
        </div>
      </Box>
    </>
  );
}
