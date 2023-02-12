import { Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import FileHeader from "../fileHeader/FileHeader";
import { RejectedFileProps } from "./RejectedFileProps";

export default function RejectedFile({ file, onDelete }: RejectedFileProps) {
  return (
    <Grid item>
      <FileHeader
        name={file.file.name}
        file={file}
        onDelete={onDelete}
        color="red"
      />
      <LinearProgress variant="determinate" value={100} color="error" />
      <Typography variant="subtitle1" color="gray">
        {file.errors[0]?.message}
      </Typography>
    </Grid>
  );
}
