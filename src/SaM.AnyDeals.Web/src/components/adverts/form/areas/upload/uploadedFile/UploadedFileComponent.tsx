import React from "react";
import { Grid, LinearProgress } from "@mui/material";
import { UploadedFileComponentProps } from "./UploadedFileComponentProps";
import FileHeader from "../fileHeader/FileHeader";

export default function UploadedFileComponent({
  file,
  onDelete,
}: UploadedFileComponentProps) {
  return (
    <Grid item>
      <FileHeader name={file.name} file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={100} />
    </Grid>
  );
}
