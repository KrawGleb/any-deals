import "./AttachmentCard.scss";
import React from "react";
import { Box } from "@mui/material";
import { Attachment } from "../../../models/api/attachment";
import AttachmentType from "../../../models/enums/attachmentType";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function AttachmentCard({
  attachment,
}: {
  attachment: Attachment;
}) {
  const onClick = () => {
    window.open(attachment.link);
  };

  return (
    <>
      {attachment.type === AttachmentType.Image ? (
        <Box className="attachment__image" onClick={onClick}>
          <img src={attachment.link} alt={attachment.name} />
        </Box>
      ) : (
        <Box className="attachment__file" onClick={onClick}>
          <InsertDriveFileIcon />
        </Box>
      )}
    </>
  );
}
