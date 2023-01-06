import ArrowBack from "@mui/icons-material/ArrowBack";
import * as yup from "yup";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import FakeSelect from "../../../components/common/fake-select/FakeSelect";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./NewAdvert.scss";
import Input from "../../../components/common/Input";
import SelectDialog from "../../../components/common/select-dialog/SelectDialog";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateAdvertMutation } from "../../../features/api/advertsService";
import { Advert } from "../../../models/api/advert";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../features/api/countriesService";
import { Contacts } from "../../../models/api/contacts";
import { SelectableItem } from "../../../models/selectableItem";
import { City } from "../../../models/api/city";
import { Category } from "../../../models/api/category";
import { Country } from "../../../models/api/country";
import { useGetCategoriesQuery } from "../../../features/api/categoriesService";

const schema = yup.object().shape({
  group: yup.number(),
  goal: yup.number(),
  interest: yup.number(),
  title: yup.string(),
  category: yup.string(),
  description: yup.string(),
  country: yup.string(),
  city: yup.string(),
  name: yup.string(),
  email: yup.string(),
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

  const [createNewAdvert, _] = useCreateAdvertMutation();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
  const handleSelectCountryDialogClose = (value?: SelectableItem) => {
    setIsCountrySelectOpen(false);
    setSelectedCountry(value as Country);
    setSelectedCity(undefined);
  };
  const { data: countries } = useGetCountriesQuery();

  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | undefined>();
  const handleSelectCityDialogClose = (value?: SelectableItem) => {
    setIsCitySelectOpen(false);
    setSelectedCity(value as City);
  };
  // TODO: filter queries (-1 isn't valid value)
  let cities: City[] = useGetCitiesQuery(selectedCountry?.id ?? -1).data ?? [];

  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const handleSelectCategoryDialogClose = (value?: SelectableItem) => {
    console.log(value);
    setIsCategorySelectOpen(false);
    setSelectedCategory(value as Category);
  };
  const { data: categories } = useGetCategoriesQuery();

  const [group, setGroup] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  const onSubmit = (data: any) => {
    let advert: Advert = {
      cityId: selectedCity!.id,
      categoryId: selectedCategory!.id,
      contacts: {
        ...data
      } as Contacts,
      ...data
    } as Advert;

    console.log({...advert});

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
                value={group}
                onChange={handleChange}
                label="Group"
                select
                required
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
                <RadioGroup row>
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
                <RadioGroup row>
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
              <Input label="Title" required {...register("title")} />
              <FakeSelect
                label={selectedCategory?.name ?? "Category"}
                required
                onClick={() => setIsCategorySelectOpen(true)}
              />
              <Input
                label="Description"
                required
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
                  label={selectedCountry?.name ?? "Country"}
                  required
                  onClick={() => setIsCountrySelectOpen(true)}
                />
                <FakeSelect
                  label={selectedCity?.name ?? "City"}
                  required
                  onClick={() => setIsCitySelectOpen(true)}
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
                  <Input label="Name" required {...register("name")} />
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
