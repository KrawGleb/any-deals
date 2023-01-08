import { Button, Grid } from "@mui/material";
import React from "react";
import { FileHeaderProps } from "./FileHeaderProps";

export default function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>{file.name}</Grid>
      <Grid item>
        <Button size="small" onClick={() => onDelete(file as any)}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
