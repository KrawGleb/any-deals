import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UploadedFile } from "../../../models/uploadedFile";
import FileUploadWithProgress from "./fileUpload/FileUploadWithProgress";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../features/store/fileUploadSlice";
import { mapFile } from "../../../features/helpers/mapFile";

export default function FilesUploadField() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAccepted = acceptedFiles.map(
        (f) => ({ file: mapFile(f), errors: [] } as UploadedFile)
      );
      const mappedRejected = rejectedFiles.map(
        (rf) =>
          ({
            file: mapFile(rf.file),
            errors: rf.errors,
          } as UploadedFile)
      );

      setFiles((curr) => [
        ...curr,
        ...acceptedFiles,
        ...rejectedFiles.map((rf) => rf.file),
      ]);

      dispatch(addFiles({ files: [...mappedAccepted, ...mappedRejected] }));
    },
    [dispatch]
  );

  const onDelete = (file: File) => {
    setFiles((cur) => cur.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  return (
    <>
      <Grid item>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>
      {files.map((file, index) => (
        <FileUploadWithProgress key={index} file={file} onDelete={onDelete} />
      ))}
    </>
  );
}
