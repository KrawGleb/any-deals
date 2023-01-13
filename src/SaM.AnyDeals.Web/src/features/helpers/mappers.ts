import { Advert } from "../../models/api/advert";
import { Contacts } from "../../models/api/contacts";
import { ElasticAdvert } from "../../models/api/elasticAdvert";
import AttachmentType from "../../models/enums/attachmentType";

export function mapAdvert(advert: ElasticAdvert): Advert {
  const mappedAdvert: Advert = {
    id: advert.id,
    title: advert.title,
    category: {
      id: -1,
      name: advert.category,
    },
    city: {
      id: -1,
      name: advert.city,
      country: {
        id: -1,
        name: advert.country,
      },
    },
    contacts: {
      name: advert.creator,
    } as Contacts,
    goal: advert.goal,
    group: advert.group,
    interest: advert.interest,
    attachments: advert.previewUrl
      ? [
          {
            link: advert.previewUrl,
            name: "",
            type: AttachmentType.Image,
          },
        ]
      : [],
  } as Advert;

  return mappedAdvert;
}
