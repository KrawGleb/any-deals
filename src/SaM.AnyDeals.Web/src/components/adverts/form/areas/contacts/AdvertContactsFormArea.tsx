import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import ControlledInput from "../../../../common/controlledInput/ControlledInput";
import { AreaProps } from "../AreaProps";

export default function AdvertContactsFormArea({ control, errors }: AreaProps) {
  const contactsErrors = (errors.contacts ?? {}) as any;

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
            name={"contacts.name"}
            label="Name"
            required
            error={!!contactsErrors?.name}
            helperMessage={contactsErrors?.name?.message}
          />

          <ControlledInput
            control={control}
            name={"contacts.email"}
            label="Email"
            error={!!contactsErrors.email}
            helperMessage={contactsErrors?.email?.message}
          />
        </Stack>

        <Stack direction="row" spacing={3}>
          <ControlledInput
            control={control}
            name={"contacts.phone"}
            label="Phone number"
            error={!!contactsErrors?.phone}
            helperMessage={contactsErrors?.phone?.message}
          />

          <ControlledInput
            control={control}
            name={"contacts.address"}
            label="Address"
            error={!!contactsErrors.address}
            helperMessage={contactsErrors?.address?.message}
          />
        </Stack>

        <Stack direction="row" spacing={3}>
          <ControlledInput
            control={control}
            name={"contacts.facebook"}
            label="Facebook"
            error={!!contactsErrors.facebook}
            helperMessage={contactsErrors?.facebook?.message}
          />

          <ControlledInput
            control={control}
            name={"contacts.vk"}
            label="VK"
            error={!!contactsErrors.vk}
            helperMessage={contactsErrors?.vk?.message}
          />
        </Stack>

        <Stack direction="row" spacing={3}>
          <ControlledInput
            control={control}
            name={"contacts.instagram"}
            label="Instagram"
            error={!!contactsErrors.instagram}
            helperMessage={contactsErrors?.instagram?.message}
          />

          <ControlledInput
            control={control}
            name={"contacts.linkedIn"}
            label="LinkedIn"
            error={!!contactsErrors.linkedIn}
            helperMessage={contactsErrors?.linkedIn?.message}
          />
        </Stack>

        <Stack direction="row" spacing={3}>
          <ControlledInput
            control={control}
            name={"contacts.telegram"}
            label="Telegram"
            error={!!contactsErrors.telegram}
            helperMessage={contactsErrors?.telegram?.message}
          />

          <ControlledInput
            control={control}
            name={"contacts.whatsApp"}
            label="WhatsApp"
            error={!!contactsErrors.whatsApp}
            helperMessage={contactsErrors?.whatsApp?.message}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
