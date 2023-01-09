import "./AdvertForm.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import FakeSelect from "../../../components/common/fakeSelect/FakeSelect";
import Input from "../../../components/common/Input";
import SelectDialog from "../../../components/common/selectDialog/SelectDialog";

import { Category } from "../../../models/api/category";
import { City } from "../../../models/api/city";
import { Contacts } from "../../../models/api/contacts";
import { Country } from "../../../models/api/country";
import { SelectableItem } from "../../../models/selectableItem";

import {
  useCreateAdvertMutation,
  useUpdateAdvertMutation,
} from "../../../features/api/advertsApi";
import { Controller, useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "../../../features/api/categoriesApi";
import { useNavigate } from "react-router-dom";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../features/api/countriesApi";
import { ValidationMessages } from "../../../features/helpers/validationMessages";
import FilesUploadField from "../../../components/common/filesUpload/FilesUploadField";
import { useSelector } from "react-redux";
import { StoredFile } from "../../../models/storedFile";
import { AttachmentType } from "../../../models/enums/attachmentType";
import { PutAdvertRequest } from "../../../models/api/requests/putAdvertRequest";
import { AdvertFormProps } from "./AdvertFromProps";
import { FirebaseService } from "../../../features/services/firebaseService";

const schema = yup.object().shape({
  title: yup.string().required(ValidationMessages.required("Title")),
  description: yup.string(),
  goal: yup.number().required(ValidationMessages.required("Goal")).default(0),
  group: yup
    .number()
    .required(ValidationMessages.required("Group"))
    .default("" as any),
  interest: yup.number().required().default(0),
  category: yup.string().required(ValidationMessages.required("Category")),
  country: yup.string().required(ValidationMessages.required("Country")),
  city: yup.string().required(ValidationMessages.required("City")),

  name: yup.string().required(ValidationMessages.required("Name")),
  email: yup.string().email(ValidationMessages.email()),
  phone: yup.string(),
  address: yup.string(),
  facebook: yup.string(),
  vk: yup.string(),
  instagram: yup.string(),
  linkedIn: yup.string(),
  telegram: yup.string(),
  whatsApp: yup.string(),
});

export default function AdvertForm({ advert }: AdvertFormProps) {
  const navigate = useNavigate();
  const [createNewAdvert] = useCreateAdvertMutation();
  const [updateAdvert] = useUpdateAdvertMutation();
  const uploadedFiles = useSelector(
    (state: any) => state.fileUpload.files as StoredFile[]
  );
  const isEditMode = !!advert;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: schema.getDefault() as any,
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

  const { data: cities } = useGetCitiesQuery(selectedCountry?.id ?? -1);
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
    setIsCategorySelectOpen(false);
    setSelectedCategory(value as Category);
  };

  const onSubmit = (data: any) => {
    updateFiles({ shouldSave: true });

    const attachments = uploadedFiles
      .filter((fileWrapper) => !fileWrapper.deleted)
      .map((fileWrapper) => ({
        link: fileWrapper.url,
        type: AttachmentType.convert(fileWrapper.type),
      }));

    const putAdvertRequest: PutAdvertRequest = {
      cityId: selectedCity!.id,
      categoryId: selectedCategory!.id,
      attachments,
      contacts: {
        ...data,
      } as Contacts,
      ...data,
    };

    isEditMode
      ? updateAdvert(putAdvertRequest)
      : createNewAdvert(putAdvertRequest);
  };

  const onCancel = () => {
    updateFiles({ shouldSave: false });
    navigate("/adverts/my");
  };

  const updateFiles = ({ shouldSave }: { shouldSave: boolean }) => {
    shouldSave
      ? uploadedFiles
          .filter((fileWrapper) => fileWrapper.deleted)
          .forEach((fileToDelete) =>
            FirebaseService.deleteFile(fileToDelete.url)
          )
      : uploadedFiles
          .filter((fileWrapper) => fileWrapper.new)
          .forEach((fileWrapper) => {
            console.log(fileWrapper);
            FirebaseService.deleteFile(fileWrapper.url);
          });
  };

  useEffect(() => {
    if (!advert) return;

    const selectedCategory = categories?.find(
      (c) => c.id === advert.category.id
    );
    const selectedCountry = countries?.find(
      (c) => c.id === advert.city.country?.id
    );
    const selectedCity = cities?.find((c) => c.id === advert.city.id);

    setSelectedCategory(selectedCategory);
    setSelectedCountry(selectedCountry);
    setSelectedCity(selectedCity);

    setValue("title", advert.title);
    setValue("description", advert.description);
    setValue("goal", advert.goal);
    setValue("interest", advert.interest);
    setValue("group", advert.group, { shouldTouch: true });

    Object.keys(advert.contacts).forEach((contact) =>
      setValue(
        contact as any,
        advert.contacts[contact as keyof typeof advert.contacts],
        { shouldTouch: true, shouldDirty: true }
      )
    );
  }, [
    advert,
    setValue,
    categories,
    countries,
    cities,
    setSelectedCategory,
    setSelectedCountry,
    setSelectedCity,
  ]);

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

      <div className="advertForm">
        <div className="advertForm__container">
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

              <Controller
                control={control}
                name="group"
                render={({ field }) => (
                  <Input
                    required
                    select
                    label="Group"
                    defaultValue=""
                    {...field}
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
                )}
              />
            </div>

            <div className="form__goal">
              <FormControl>
                <Typography variant="h5">Advertisement's goal</Typography>
                <Controller
                  name="goal"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row defaultValue={0} {...field}>
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="I'm looking for"
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="I suggest"
                      />
                    </RadioGroup>
                  )}
                />
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
                  <Input
                    label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
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

              <FilesUploadField
                uploadedFiles={
                  advert?.attachments
                    ? advert.attachments.map(
                        (attachment, index) =>
                          ({
                            id: index,
                            name: "Name here",
                            type: AttachmentType.convertToString(
                              attachment.type
                            ),
                            deleted: false,
                            url: attachment.link,
                          } as StoredFile)
                      )
                    : []
                }
              />
            </div>

            <div className="form__actions">
              <div className="left">
                <Button
                  variant="contained"
                  sx={{ marginRight: "16px" }}
                  onClick={onCancel}
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
              {advert ? (
                <Button variant="contained" color="error">
                  Delete advert
                </Button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}
