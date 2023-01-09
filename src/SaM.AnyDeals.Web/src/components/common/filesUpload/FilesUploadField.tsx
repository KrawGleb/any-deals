import "./FilesUploadField.scss";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UploadedFile } from "../../../models/uploadedFile";
import FileUploadWithProgress from "./fileUpload/FileUploadWithProgress";
import { useDispatch } from "react-redux";
import { addFiles, deleteFile } from "../../../features/store/fileUploadSlice";
import { mapFile } from "../../../features/helpers/mapFile";
import { FilesUploadFieldProps } from "./FilesUploadFieldProps";
import UploadedFileComponent from "./uploadedFile/UploadedFileComponent";
import Stack from "@mui/material/Stack";

export default function FilesUploadField({
  uploadedFiles,
}: FilesUploadFieldProps) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [_uploadedFiles, setUploadedFiles] = useState<
    UploadedFile[] | undefined
  >(uploadedFiles);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAccepted = acceptedFiles.map(
        (f) => ({ name: f.name, file: mapFile(f), errors: [] } as UploadedFile)
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
    const serializableFile = mapFile(file);

    setFiles((cur) => cur.filter((f) => f !== file));
    dispatch(deleteFile({ file: serializableFile }));
  };

  const onDeleteUploaded = (uploadedFile: UploadedFile) => {
    setUploadedFiles((cur) => cur?.filter((f) => f !== uploadedFile));
    dispatch(deleteFile({ file: uploadedFile }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  useEffect(() => {
    dispatch(addFiles({ files: uploadedFiles ?? [] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid item>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>
      <Stack spacing={1} sx={{ marginTop: "6px" }}>
        {files.map((file, index) => (
          <FileUploadWithProgress key={index} file={file} onDelete={onDelete} />
        ))}
        {_uploadedFiles?.map((file, index) => (
          <UploadedFileComponent
            key={index}
            file={file}
            onDelete={onDeleteUploaded}
          />
        ))}
      </Stack>
    </>
  );
}
