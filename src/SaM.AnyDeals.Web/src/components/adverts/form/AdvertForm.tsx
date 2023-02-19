import "./AdvertForm.scss";
import React, { useEffect, useState } from "react";

import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Stack, Typography, Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { RootState } from "../../../features/store/store";
import {
  useCreateAdvertMutation,
  useDeleteAdvertMutation,
  useUpdateAdvertMutation,
  useUpdateAdvertStatusMutation,
} from "../../../features/api/extensions/advertsApiExtension";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoredFile } from "../../../models/storedFile";
import { AttachmentType } from "../../../models/enums/attachmentType";
import { PutAdvertRequest } from "../../../models/api/requests/putAdvertRequest";
import { AdvertFormProps } from "./AdvertFromProps";
import { FirebaseService } from "../../../features/services/firebaseService";
import { Attachment } from "../../../models/api/attachment";
import { Status } from "../../../models/enums/status";
import AdvertGroupFormArea from "./areas/group/AdvertGroupFormArea";
import AdvertBasicsFormArea from "./areas/basics/AdvertBasicsFormArea";
import AdvertLocationFormArea from "./areas/location/AdvertLocationFormArea";
import AdvertContactsFormArea from "./areas/contacts/AdvertContactsFormArea";
import AdvertFilesUploadArea from "./areas/upload/AdvertFilesUploadArea";
import { Location } from "../../../models/location";
import { Category } from "../../../models/api/category";
import { Contacts } from "../../../models/api/contacts";

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
    price: yup
      .number()
      .notRequired()
      .when(["interest"], {
        is: (value: number) => value === 0,
        then: yup.number().required().positive(),
        otherwise: yup
          .number()
          .notRequired()
          .transform((value) => (isNaN(value) ? undefined : value))
          .nullable(),
      })
      .default(0)
      .label("Price"),
    paymentMethod: yup.number().default(0).label("Payment Method"),
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

  const [selectedLocation, setSelectedLocation] = useState<Location>({});
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: schema.getDefault() as any,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const changeStatus = (status: number) => {
    const updateStatusAction = updateStatus({ id: advert!.id, status });

    updateStatusAction.then(() => {
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
      cityId: selectedLocation.city!.id,
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

  const onCategoryChanged = (category: Category) =>
    setSelectedCategory(category);

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

    setSelectedCategory(advert.category);
    setSelectedLocation({
      city: advert?.city,
      country: advert?.city?.country,
    });

    const initialData = {
      ...advert,
      ...advert?.contacts,
      city: advert?.city.name,
      country: advert?.city?.country.name,
      category: advert?.category.name,
    };

    reset(initialData, {
      keepDirty: false,
      keepErrors: false,
      keepIsValid: false,
      keepTouched: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advert]);

  return (
    <Box>
      <div className="advert-form">
        <div className="advert-form__container">
          <div className="advert-form__back-line">
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
            <AdvertGroupFormArea
              control={control}
              errors={errors}
              watch={watch}
            />
            <AdvertBasicsFormArea
              control={control}
              errors={errors}
              register={register}
              category={selectedCategory}
              onCategoryChanged={onCategoryChanged}
            />
            <AdvertLocationFormArea
              control={control}
              errors={errors}
              register={register}
              location={selectedLocation}
            />
            <AdvertContactsFormArea control={control} errors={errors} />
            <AdvertFilesUploadArea
              control={control}
              errors={errors}
              attachments={advert?.attachments}
            />

            <Box className="form__actions">
              <Box className="left">
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
              </Box>
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
            </Box>
          </form>
        </div>
      </div>
    </Box>
  );
}
