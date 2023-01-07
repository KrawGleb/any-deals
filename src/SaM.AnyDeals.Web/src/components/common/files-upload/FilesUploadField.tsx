import { Grid } from "@mui/material";
import { deleteObject, ref } from "firebase/storage";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UploadedFile } from "../../../models/uploadedFile";
import firebaseStorage from "../../../store/firebaseStorage";
import FileUploadWithProgress from "./file-upload/FileUploadWithProgress";

export default function FilesUploadField() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAccepted = acceptedFiles.map(
        (f) => ({ file: f, errors: [] } as UploadedFile)
      );
      const mappedRejected = rejectedFiles as UploadedFile[];

      setFiles((curr) => [...curr, ...mappedAccepted, ...mappedRejected]);
    },
    []
  );

  const onDelete = (file: File) => {
    const fileWrapper = files.find((fw) => fw.file === file);

    setFiles((cur) => cur.filter((fw) => fw !== fileWrapper));

    if (fileWrapper?.url) {
      const fileRef = ref(firebaseStorage, fileWrapper.url);
      deleteObject(fileRef);
    }
  };

  const onUpload = (file: File, url: string) => {
    setFiles((cur) =>
      cur.map((fileWrapper) =>
        fileWrapper.file === file ? { ...fileWrapper, url } : fileWrapper
      )
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": []
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
      {files.map((fileWrapper, index) => (
        <FileUploadWithProgress
          key={index}
          file={fileWrapper.file}
          onDelete={onDelete}
          onUpload={onUpload}
        />
      ))}
    </>
  );
}
