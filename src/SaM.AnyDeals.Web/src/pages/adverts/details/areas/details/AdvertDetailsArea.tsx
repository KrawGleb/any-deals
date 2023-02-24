import React from "react";
import "./AdvertDetailsArea.scss";
import { Paper, Typography } from "@mui/material";
import AttachmentCard from "../../../../../components/adverts/fields/attachmentCard/AttachmentCard";
import GoalTag from "../../../../../components/adverts/fields/goalTag/GoalTag";
import InterestTag from "../../../../../components/adverts/fields/interestTag/InterestTag";
import { Advert } from "../../../../../models/api/advert";
import ContactsGrid from "../../../../../components/adverts/fields/contactsGrid/ContactsGrid";

export default function AdvertDetailsArea({ advert }: { advert: Advert }) {
  return (
    <>
      <div className="advert-details__details__area">
        <div className="advert-details__row">
          <Paper className="advert-details__content">
            <div className="advert-details__content__header">
              <GoalTag goal={advert.goal} />
              <InterestTag interest={advert.interest} />
            </div>

            <Typography variant="h5" fontWeight="bold" className="mb-2">
              {advert.title}
            </Typography>
            <Typography variant="subtitle1">{advert.category.name}</Typography>

            <Typography variant="subtitle2" className="mb-2">
              {advert.city.country.name}, {advert.city.name}
            </Typography>
            {advert.description ? (
              <div className="advert-details__content__description">
                {advert.description}
              </div>
            ) : (
              <></>
            )}
          </Paper>
          <ContactsGrid contacts={advert.contacts} />
        </div>

        {advert.attachments.length > 0 ? (
          <Paper className="advert-details__attachments">
            {advert.attachments.map((attachment, index) => (
              <AttachmentCard key={index} attachment={attachment} />
            ))}
          </Paper>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
