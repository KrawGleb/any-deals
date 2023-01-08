import React from "react";
import { Grid, LinearProgress } from "@mui/material";
import FileHeader from "../fileHeader/FileHeader";
import { UploadedFileComponentProps } from "./UploadedFileComponentProps";

export default function UploadedFileComponent({
  file,
  onDelete,
}: UploadedFileComponentProps) {
  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={100} />
    </Grid>
  );
}
