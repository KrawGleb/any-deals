import { Paper } from "@mui/material";
import { Controller } from "react-hook-form";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import AttachmentType from "../../../../../models/enums/attachmentType";
import { StoredFile } from "../../../../../models/storedFile";
import { AdvertFilesUploadAreaProps } from "./AdvertFilesUploadAreaProps";
import FilesUploadField from "./FilesUploadField";

export default function AdvertFilesUploadArea({
  control,
  attachments,
}: AdvertFilesUploadAreaProps) {
  const [uploadedFiles, setUploadedFiles] = useState<StoredFile[] | undefined>(
    []
  );

  useEffect(() => {
    if (!attachments) return;

    setUploadedFiles(
      attachments.map(
        (attachment, index) =>
          ({
            id: index,
            name: attachment.name,
            type: AttachmentType.convertToString(attachment.type),
            deleted: false,
            url: attachment.link,
          } as StoredFile)
      )
    );
  }, [attachments]);

  return (
    <Paper sx={{ padding: "16px" }}>
      <Typography variant="h6">Documents, images</Typography>
      <Typography variant="subtitle1" className="mb-3" color="gray">
        The first file will be visible on the announcement card
      </Typography>

      <Controller
        control={control}
        name={"files"}
        render={(field) => (
          <FilesUploadField {...field} uploadedFiles={uploadedFiles} />
        )}
      />
    </Paper>
  );
}
