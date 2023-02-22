import React from "react";
import "./ContactsGrid.scss";
import { Contacts } from "../../../../models/api/contacts";
import { Grid, Paper, Typography } from "@mui/material";

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
  const contactsMap = new Map<string, any>([
    ["email", <AlternateEmailIcon key="email" />],
    ["address", <PlaceIcon key="address" />],
    ["phone", <PhoneIcon key="phone" />],
    ["linkedIn", <LinkedInIcon key="linkedIn" />],
    ["facebook", <FacebookIcon key="facebook" />],
    ["instagram", <InstagramIcon key="instagram" />],
    ["telegram", <TelegramIcon key="telegram" />],
    ["whatsApp", <WhatsAppIcon key="whatsApp" />],
    ["vk", <EightKIcon key="vk" />],
  ]);

  return (
    <Paper className="contacts">
      <div className="contacts__row">
        <Typography variant="subtitle1" noWrap>
          Contacts
        </Typography>
      </div>

      <div className="contacts__row">
        <Typography variant="h6" noWrap>
          {contacts.name}
        </Typography>
      </div>

      {Object.keys({ ...contacts }).map((contact, index) =>
        contacts[contact as keyof typeof contacts] &&
        contactsMap.get(contact) ? (
          <div key={index} className="contacts__row">
            {contactsMap.get(contact)}
            <Typography>
              {contacts[contact as keyof typeof contacts]}
            </Typography>
          </div>
        ) : (
          <></>
        )
      )}
    </Paper>
  );
}
