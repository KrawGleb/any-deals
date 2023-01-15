import "./AdvertsDetails.scss";
import React from "react";
import { useGetAdvertByIdQuery } from "../../../features/api/extensions/advertsApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import { Paper } from "@mui/material";
import GoalTag from "../../../components/adverts/fields/goalTag/GoalTag";
import InterestTag from "../../../components/adverts/fields/interestTag/InterestTag";
import AttachmentCard from "../../../components/adverts/fields/attachmentCard/AttachmentCard";
import ContactsGrid from "../../../components/adverts/fields/contactsGrid/ContactsGrid";

export default function AdvertsDetails() {
  const query = useQuery() as any;
  const advertId: number = +query.get("id");
  const { data: advert } = useGetAdvertByIdQuery(advertId);

  return (
    <>
      {!!advert ? (
        <div className="details">
          <Paper className="details__body">
            <div className="paper details__content">
              <div className="details__content__header">
                <GoalTag goal={advert.goal} />
                <InterestTag interest={advert.interest} />
              </div>

              <div className="details__content__title">{advert.title}</div>
              <div className="details__content__properties">
                {advert.category.name}
              </div>
              <div className="details__content__country">
                {advert.city.country.name}, {advert.city.name}
              </div>
              {advert.description ? (
                <div className="details__content__description">
                  {advert.description}
                </div>
              ) : (
                <></>
              )}
              <ContactsGrid contacts={advert.contacts} />
            </div>
            <div className="paper details__attachments">
              {advert.attachments.map((attachment, index) => (
                <AttachmentCard key={index} attachment={attachment} />
              ))}
            </div>
          </Paper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
