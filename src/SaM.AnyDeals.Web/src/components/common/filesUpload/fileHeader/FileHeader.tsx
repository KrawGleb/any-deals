import { Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { mapFile } from "../../../../features/helpers/mapFile";
import { deleteFile } from "../../../../features/store/fileUploadSlice";
import { FileHeaderProps } from "./FileHeaderProps";

export default function FileHeader({ file, onDelete }: FileHeaderProps) {
  const serializableFile = mapFile(file);
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => {
    onDelete(file);
    dispatch(deleteFile({ file: serializableFile }));
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item>{file.name}</Grid>
      <Grid item>
        <Button size="small" onClick={handleDeleteButtonClick}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
