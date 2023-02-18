import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ControlledInput from "../../../../common/controlledInput/ControlledInput";
import { AreaProps } from "../AreaProps";

export default function AdvertContactsFormArea({ control, errors }: AreaProps) {
  return (
    <Paper sx={{ padding: "16px" }}>
      <Typography variant="h6">Contacts</Typography>
      <Typography variant="subtitle1" className="mb-3" color="gray">
        At least one way to contact you: mail, phone, links to websites, social
        networks, messenger accounts, etc.
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
            error={!!errors.address}
            helperMessage={errors?.address?.message}
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
            error={!!errors.whatsApp}
            helperMessage={errors?.whatsApp?.message}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
