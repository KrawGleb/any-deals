import "./NewAdvert.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import FakeSelect from "../../../components/common/fake-select/FakeSelect";
import Input from "../../../components/common/Input";
import SelectDialog from "../../../components/common/select-dialog/SelectDialog";

import { Advert } from "../../../models/api/advert";
import { Category } from "../../../models/api/category";
import { City } from "../../../models/api/city";
import { Contacts } from "../../../models/api/contacts";
import { Country } from "../../../models/api/country";
import { SelectableItem } from "../../../models/selectableItem";

import { useCreateAdvertMutation } from "../../../features/api/advertsApi";
import { useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "../../../features/api/categoriesApi";
import { useNavigate } from "react-router-dom";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../features/api/countriesApi";

const schema = yup.object().shape({
  title: yup.string().required("Title is a required field"),
  description: yup.string(),
  goal: yup.number().required("Goal is a required field"),
  group: yup.number().required("Group is a required field"),
  interest: yup.number().required(),
  category: yup.string().required("Category is a required field"),
  country: yup.string().required("Country is a required field"),
  city: yup.string().required("City is a required field"),
  name: yup.string().required("Name is a required field"),
  email: yup.string().email("Invalid email format"),
  phone: yup.string(),
  address: yup.string(),
  facebook: yup.string(),
  vk: yup.string(),
  instagram: yup.string(),
  linkedIn: yup.string(),
  telegram: yup.string(),
  whatsApp: yup.string(),
});

export default function NewAdvert() {
  const navigate = useNavigate();
  const [createNewAdvert] = useCreateAdvertMutation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { data: countries } = useGetCountriesQuery();
  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const handleSelectCountryDialogClose = (value?: SelectableItem) => {
    setIsCountrySelectOpen(false);
    setSelectedCountry(value as Country);
    setSelectedCity(undefined);
  };

  let cities: City[] = useGetCitiesQuery(selectedCountry?.id ?? -1).data ?? [];
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | undefined>();
  const handleSelectCityDialogClose = (value?: SelectableItem) => {
    setIsCitySelectOpen(false);
    setSelectedCity(value as City);
  };

  const { data: categories } = useGetCategoriesQuery();
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const handleSelectCategoryDialogClose = (value?: SelectableItem) => {
    console.log(value);
    setIsCategorySelectOpen(false);
    setSelectedCategory(value as Category);
  };

  const [group, setGroup] = useState<number | undefined>();
  const handleChange = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };

  const onSubmit = (data: any) => {
    let advert: Advert = {
      cityId: selectedCity!.id,
      categoryId: selectedCategory!.id,
      contacts: {
        ...data,
      } as Contacts,
      ...data,
    } as Advert;

    createNewAdvert(advert).unwrap();
  };

  return (
    <Box>
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

      <div className="new">
        <div className="new__container">
          <div className="back-line">
            <div className="line" onClick={() => navigate("/adverts/my")}>
              <div className="row">
                <ArrowBack fontSize="medium" />
              </div>
              <Typography className="row nav-text prevent-select">
                Back
              </Typography>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit, onSubmit)}>
            <Box className="title">
              <Typography variant="h5" className="title__text">
                Basic information
              </Typography>
            </Box>

            <div className="form__group">
              <Typography variant="h5">Advertisement's group</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                In which section would you like to place your ad?
              </Typography>
              <Input
                {...register("group")}
                required
                select
                label="Group"
                value={group}
                onChange={handleChange}
                error={!!errors.group}
                helperText={errors?.group?.message}
              >
                <MenuItem key={0} value={0}>
                  Services nearby
                </MenuItem>
                <MenuItem key={1} value={1}>
                  Online services
                </MenuItem>
                <MenuItem key={2} value={2}>
                  Events and places
                </MenuItem>
              </Input>
            </div>

            <div className="form__goal">
              <FormControl>
                <Typography variant="h5">Advertisement's goal</Typography>
                <RadioGroup row defaultValue={0}>
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="I'm looking for"
                    {...register("goal")}
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="I suggest"
                    {...register("goal")}
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="form__interest mb-4">
              <FormControl>
                <Typography variant="h5">My interest</Typography>
                <RadioGroup row defaultValue={0}>
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Commercial"
                    {...register("interest")}
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Social"
                    {...register("interest")}
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Stack spacing={2} className="mb-5">
              <Input
                label="Title"
                required
                {...register("title")}
                error={!!errors.title}
                helperText={errors?.title?.message}
              />
              <FakeSelect
                required
                label="Category"
                value={selectedCategory?.name ?? ""}
                onClick={() => setIsCategorySelectOpen(true)}
                {...register("category")}
                error={!!errors.category}
                helperText={errors?.category?.message}
              />
              <Input
                label="Description"
                multiline
                rows={4}
                {...register("description")}
              />
            </Stack>

            <div className="form__location mb-5">
              <Typography variant="h5" className="mb-3">
                Advertisement's location
              </Typography>
              <Stack direction="row" spacing={2}>
                <FakeSelect
                  required
                  label="Country"
                  value={selectedCountry?.name ?? ""}
                  onClick={() => setIsCountrySelectOpen(true)}
                  {...register("country")}
                  error={!!errors.country}
                  helperText={errors?.country?.message}
                />
                <FakeSelect
                  required
                  label="City"
                  value={selectedCity?.name ?? ""}
                  onClick={() => setIsCitySelectOpen(true)}
                  {...register("city")}
                  error={!!errors.city}
                  helperText={errors?.city?.message}
                />
              </Stack>
            </div>

            <div className="form__contacts mb-5">
              <Typography variant="h5">Contacts</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                At least one way to contact you: mail, phone, links to websites,
                social networks, messenger accounts, etc.
              </Typography>

              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <Input
                    label="Name"
                    required
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                  />
                  <Input label="Email" {...register("email")} />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Phone number" {...register("phone")} />
                  <Input label="Address" {...register("address")} />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Facebook" {...register("facebook")} />
                  <Input label="VK" {...register("vk")} />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Instagram" {...register("instagram")} />
                  <Input label="LinkedIn" {...register("linkedIn")} />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Input label="Telegram" {...register("telegram")} />
                  <Input label="WhatsApp" {...register("whatsApp")} />
                </Stack>
              </Stack>
            </div>

            <div className="form__docs mb-5">
              <Typography variant="h5">Documents, images</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                The first file will be visible on the announcement card
              </Typography>
            </div>

            <div className="form__actions">
              <Button
                variant="contained"
                sx={{ marginRight: "16px" }}
                onClick={() => navigate("/adverts/my")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                disabled={!isDirty || !isValid}
              >
                Create and publish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}
