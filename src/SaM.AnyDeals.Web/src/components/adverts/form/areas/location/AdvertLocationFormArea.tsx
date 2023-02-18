import { Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../../../features/api/extensions/countriesApiExtension";
import { City } from "../../../../../models/api/city";
import { Country } from "../../../../../models/api/country";
import { SelectableItem } from "../../../../../models/selectableItem";
import FakeSelect from "../../../../common/fakeSelect/FakeSelect";
import SelectDialog from "../../../../dialogs/select/SelectDialog";
import { AdvertLocationFormAreaProps } from "./AdvertLocationFormAreaProps";

export default function AdvertLocationFormArea({
  errors,
  register,
  location,
}: AdvertLocationFormAreaProps) {
  const { data: countries } = useGetCountriesQuery();
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const handleSelectCountryDialogClose = (value?: SelectableItem) => {
    setIsCountrySelectOpen(false);
    setSelectedCountry(value as Country);
    setSelectedCity(undefined);
  };

  const { data: cities } = useGetCitiesQuery(selectedCountry?.id ?? -1);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | undefined>();
  const handleSelectCityDialogClose = (value?: SelectableItem) => {
    setIsCitySelectOpen(false);
    setSelectedCity(value as City);
  };

  useEffect(() => {
    console.log(location);
    setSelectedCountry(location.country);
    setSelectedCity(location.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    location.city = selectedCity;
    location.country = selectedCountry;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, selectedCountry]);

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

      <Paper sx={{ padding: "16px" }}>
        <Typography variant="h6" className="mb-3">
          Advertisement's location
        </Typography>
        <Stack direction="row" spacing={2}>
          <FakeSelect
            required
            label="Country"
            value={selectedCountry?.name ?? ""}
            onClick={() => setIsCountrySelectOpen(true)}
            {...register!("country")}
            error={!!errors.country}
            helperText={errors?.country?.message}
          />
          <FakeSelect
            required
            label="City"
            value={selectedCity?.name ?? ""}
            onClick={() => setIsCitySelectOpen(true)}
            {...register!("city")}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
        </Stack>
      </Paper>
    </>
  );
}
