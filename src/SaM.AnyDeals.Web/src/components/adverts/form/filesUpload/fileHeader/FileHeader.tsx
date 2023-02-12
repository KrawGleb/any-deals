import React from "react";
import { Button, Grid } from "@mui/material";
import { FileHeaderProps } from "./FileHeaderProps";

export default function FileHeader({
  name,
  file,
  onDelete,
  color,
}: FileHeaderProps) {
  return (
    <Grid container justifyContent="space-between">
      <Grid item color={color}>
        {name}
      </Grid>
      <Grid item>
        <Button size="small" onClick={() => onDelete(file as any)}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
