import "./ContactsGrid.scss";
import React from "react";
import { Contacts } from "../../../models/api/contacts";
import { Grid } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EightKIcon from "@mui/icons-material/EightK";

export default function ContactsGrid({ contacts }: { contacts: Contacts }) {
  const contactsIcons = {
    name: <PersonIcon />,
    address: <PlaceIcon />,
    email: <AlternateEmailIcon />,
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    telegram: <TelegramIcon />,
    phone: <PhoneIcon />,
    linkedIn: <LinkedInIcon />,
    whatsApp: <WhatsAppIcon />,
    vk: <EightKIcon />,
  };

  return (
    <>
      <Grid container spacing={3} columns={5}>
        {Object.keys(contacts).map((key, index) =>
          contacts[key as keyof typeof contacts] ? (
            <Grid
              item
              key={index}
              xs={2}
              display="flex"
              gap="4px"
            >
              {contactsIcons[key as keyof typeof contactsIcons]}
              {contacts[key as keyof typeof contacts]}
            </Grid>
          ) : (
            <></>
          )
        )}
      </Grid>
    </>
  );
}
