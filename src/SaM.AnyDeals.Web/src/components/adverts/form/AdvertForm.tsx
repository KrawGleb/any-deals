import "./AdvertForm.scss";
import React, { useEffect, useState } from "react";

import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";

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

import FakeSelect from "../../common/fakeSelect/FakeSelect";
import SelectDialog from "../../dialogs/select/SelectDialog";
import FilesUploadField from "./filesUpload/FilesUploadField";

import { Category } from "../../../models/api/category";
import { City } from "../../../models/api/city";
import { Contacts } from "../../../models/api/contacts";
import { Country } from "../../../models/api/country";
import { SelectableItem } from "../../../models/selectableItem";
import { RootState } from "../../../features/store/store";

import {
  useCreateAdvertMutation,
  useDeleteAdvertMutation,
  useUpdateAdvertMutation,
  useUpdateAdvertStatusMutation,
} from "../../../features/api/extensions/advertsApiExtension";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoredFile } from "../../../models/storedFile";
import { AttachmentType } from "../../../models/enums/attachmentType";
import { PutAdvertRequest } from "../../../models/api/requests/putAdvertRequest";
import { AdvertFormProps } from "./AdvertFromProps";
import { FirebaseService } from "../../../features/services/firebaseService";
import { Attachment } from "../../../models/api/attachment";
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
} from "../../../features/api/extensions/countriesApiExtension";
import { useGetCategoriesQuery } from "../../../features/api/extensions/categoriesApiExtension";
import { Status } from "../../../models/enums/status";
import ControlledInput from "../../common/controlledInput/ControlledInput";

const schema = yup.object().shape(
  {
    title: yup.string().label("Title").required().max(100).default(""),
    description: yup.string().label("Description").max(1000).default(""),
    goal: yup.number().label("Goal").required().default(0),
    group: yup
      .number()
      .label("Group")
      .required()
      .default("" as any),
    interest: yup.number().label("Interest").required().default(0),
    category: yup.string().label("Category").required(),
    country: yup.string().label("Country").required(),
    city: yup.string().label("City").required(),
    name: yup.string().label("Name").required().max(100).default(""),
    email: yup.string().label("Email").email().max(100).default(""),
    phone: yup
      .string()
      .when("phone", {
        is: (value: string) => value?.length > 0,
        then: yup.string().phone(),
        otherwise: yup.string(),
      })
      .default("")
      .label("Phone"),
    address: yup.string().label("Address").max(100).default(""),
    facebook: yup.string().label("Facebook").max(100).default(""),
    vk: yup.string().label("VK").max(100).default(""),
    instagram: yup.string().label("Instagram").max(100).default(""),
    linkedIn: yup.string().label("LinkedId").max(100).default(""),
    telegram: yup.string().label("Telegram").max(100).default(""),
    whatsApp: yup.string().label("WhatsApp").max(100).default(""),
  },
  [["phone", "phone"]]
);

export default function AdvertForm({ advert }: AdvertFormProps) {
  const navigate = useNavigate();
  const [createNewAdvert] = useCreateAdvertMutation();
  const [updateAdvert] = useUpdateAdvertMutation();
  const [updateStatus] = useUpdateAdvertStatusMutation();
  const [deleteAdvert] = useDeleteAdvertMutation();
  const uploadedFiles = useSelector(
    (state: RootState) => state.fileUpload.files as StoredFile[]
  );
  const authState = useSelector((state: RootState) => state.auth);
  const isEditMode = !!advert;
  const isAdmin = authState.isAdmin;

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

  const changeStatus = (status: number) => {
    const updateStatusAction = updateStatus({ id: advert!.id, status });

    updateStatusAction.then((response) => {
      exitWithoutSaving();
    });
  };

  const onSubmit = (data: any) => {
    updateFiles({ shouldSave: true });

    const attachments = uploadedFiles
      .filter((fileWrapper) => !fileWrapper.deleted)
      .map(
        (fileWrapper) =>
          ({
            name: fileWrapper.name,
            link: fileWrapper.url,
            type: AttachmentType.convert(fileWrapper.type),
          } as Attachment)
      );

    const putAdvertRequest: PutAdvertRequest = {
      id: advert?.id,
      cityId: selectedCity!.id,
      categoryId: selectedCategory!.id,
      category: selectedCategory?.name,
      attachments,
      contacts: {
        ...data,
      } as Contacts,
      ...data,
    };

    const mutationAction = isEditMode
      ? updateAdvert(putAdvertRequest)
      : createNewAdvert(putAdvertRequest);

    mutationAction.then(() => navigate("/adverts/my"));
  };

  const exitWithoutSaving = () => {
    updateFiles({ shouldSave: false });
    navigate("/adverts/my");
  };

  const onDelete = () => {
    deleteAdvert({ id: advert!.id }).then(() => {
      navigate("/adverts/my");
    });
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
            FirebaseService.deleteFile(fileWrapper.url);
          });
  };

  useEffect(() => {
    setValue("name", authState.user?.profile.preferred_username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!advert) return;

    const setValueOptions = {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    };

    const selectedCategory =
      categories?.find((c) => c.id === advert.category.id) ?? advert.category;
    const selectedCountry = countries?.find(
      (c) => c.id === advert.city.country?.id
    );
    const selectedCity = cities?.find((c) => c.id === advert.city.id);

    setSelectedCategory(selectedCategory);
    setSelectedCountry(selectedCountry);
    setSelectedCity(selectedCity);

    setValue("country", advert.city.country.name, setValueOptions);
    setValue("city", advert.city.name, setValueOptions);
    setValue("category", advert.category.name, setValueOptions);
    setValue("title", advert.title, setValueOptions);
    setValue("description", advert.description, setValueOptions);
    setValue("goal", advert.goal, setValueOptions);
    setValue("interest", advert.interest, setValueOptions);
    setValue("group", advert.group, setValueOptions);

    setValue("email", advert.contacts.email, setValueOptions);

    Object.keys(advert.contacts).forEach((contact) =>
      setValue(
        contact,
        advert.contacts[contact as keyof typeof advert.contacts],
        setValueOptions
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advert, categories, countries, cities]);

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
        allowCustom={true}
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

              <ControlledInput
                control={control}
                name="group"
                required
                select
                label="Group"
                defaultValue=""
                error={!!errors.group}
                helperMessage={errors?.group?.message}
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
              </ControlledInput>
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
                <Controller
                  name="interest"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row defaultValue={0} {...field}>
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Commercial"
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Social"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </div>

            <Stack spacing={2} className="mb-5">
              <ControlledInput
                control={control}
                name={"title"}
                label="Title"
                required
                error={!!errors.title}
                helperMessage={errors?.title?.message}
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

              <ControlledInput
                multiline
                name="description"
                control={control}
                label="Description"
                rows={4}
                error={!!errors.description}
                helperMessage={errors?.description?.message}
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
                  <ControlledInput
                    control={control}
                    name={"name"}
                    label="Name"
                    required
                    error={!!errors.name}
                    helperMessage={errors?.name?.message}
                  />

                  <ControlledInput
                    control={control}
                    name={"email"}
                    label="Email"
                    error={!!errors.email}
                    helperMessage={errors?.email?.message}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <ControlledInput
                    control={control}
                    name={"phone"}
                    label="Phone number"
                    error={!!errors.phone}
                    helperMessage={errors?.phone?.message}
                  />

                  <ControlledInput
                    control={control}
                    name={"address"}
                    label="Address"
                    error={!!errors.phone}
                    helperMessage={errors?.phone?.message}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <ControlledInput
                    control={control}
                    name={"facebook"}
                    label="Facebook"
                    error={!!errors.facebook}
                    helperMessage={errors?.facebook?.message}
                  />

                  <ControlledInput
                    control={control}
                    name={"vk"}
                    label="VK"
                    error={!!errors.vk}
                    helperMessage={errors?.vk?.message}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <ControlledInput
                    control={control}
                    name={"instagram"}
                    label="Instagram"
                    error={!!errors.instagram}
                    helperMessage={errors?.instagram?.message}
                  />

                  <ControlledInput
                    control={control}
                    name={"linkedIn"}
                    label="LinkedIn"
                    error={!!errors.linkedIn}
                    helperMessage={errors?.linkedIn?.message}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <ControlledInput
                    control={control}
                    name={"telegram"}
                    label="Telegram"
                    error={!!errors.telegram}
                    helperMessage={errors?.telegram?.message}
                  />

                  <ControlledInput
                    control={control}
                    name={"whatsApp"}
                    label="WhatsApp"
                    error={!!errors.phone}
                    helperMessage={errors?.phone?.message}
                  />
                </Stack>
              </Stack>
            </div>

            <div className="form__docs mb-5">
              <Typography variant="h5">Documents, images</Typography>
              <Typography variant="subtitle1" className="mb-3" color="gray">
                The first file will be visible on the announcement card
              </Typography>

              <Controller
                control={control}
                name={"files"}
                render={(field) => (
                  <FilesUploadField
                    {...field}
                    uploadedFiles={
                      advert?.attachments
                        ? advert.attachments.map(
                            (attachment, index) =>
                              ({
                                id: index,
                                name: attachment.name,
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
                )}
              />
            </div>

            <div className="form__actions">
              <div className="left">
                <Button
                  variant="contained"
                  sx={{ marginRight: "16px" }}
                  onClick={exitWithoutSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  disabled={!isDirty || !isValid}
                >
                  {isEditMode ? "Save and continue" : "Create and publish"}
                </Button>
              </div>
              <Stack direction="row" spacing={2}>
                {isAdmin && isEditMode ? (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => changeStatus(Status.Accepted)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => changeStatus(Status.Rejected)}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {isEditMode ? (
                  <Button variant="contained" color="error" onClick={onDelete}>
                    Delete advert
                  </Button>
                ) : (
                  <></>
                )}
              </Stack>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}
