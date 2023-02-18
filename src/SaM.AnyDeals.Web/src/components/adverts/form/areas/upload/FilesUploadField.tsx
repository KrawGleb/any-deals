import "./FilesUploadField.scss";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { RootState } from "../../../../../features/store/store";
import FileUploadWithProgress from "./fileUpload/FileUploadWithProgress";
import UploadedFileComponent from "./uploadedFile/UploadedFileComponent";
import { StoredFile } from "../../../../../models/storedFile";
import { UploadableFile } from "../../../../../models/uploadableFile";
import { FilesUploadFieldProps } from "./FilesUploadFieldProps";
import {
  addFiles,
  deleteFile,
  resetFiles,
} from "../../../../../features/store/slices/fileUploadSlice";
import RejectedFile from "./rejectedFile/RejectedFile";
import { FieldError } from "react-hook-form";

export default function FilesUploadField({
  uploadedFiles,
  field,
  fieldState,
  formState,
}: FilesUploadFieldProps) {
  const dispatch = useDispatch();
  const storedFilesCount = useSelector(
    (state: RootState) => state.fileUpload.files.length
  );

  const [_files, setFiles] = useState<UploadableFile[]>([]);
  const [_storedFiles, setStoredFiles] = useState<StoredFile[] | undefined>(
    uploadedFiles
  );
  const [_rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (_files.length + (_storedFiles?.length ?? 0) > 25) return;

      let fileId = storedFilesCount;
      const storedFiles: StoredFile[] = [];
      const uploadableFile: UploadableFile[] = [];

      acceptedFiles.forEach((file) => {
        storedFiles.push({
          id: fileId,
          name: file.name,
          type: file.type,
          deleted: false,
          new: true,
        });

        uploadableFile.push({
          id: fileId,
          file,
        });

        fileId++;
      });

      setFiles((curr) => [...curr, ...uploadableFile]);
      setRejectedFiles(rejectedFiles);
      dispatch(addFiles(storedFiles));
    },
    [dispatch, storedFilesCount]
  );

  const onDelete = (file: UploadableFile) => {
    setFiles((cur) => cur.filter((f) => f.id !== file.id));
    dispatch(deleteFile({ id: file.id }));
  };

  const onDeleteUploaded = (uploadedFile: StoredFile) => {
    setStoredFiles((cur) => cur?.filter((f) => f.id !== uploadedFile.id));
    dispatch(deleteFile({ id: uploadedFile.id }));
  };

  const onDeleteRejected = (rejection: FileRejection) => {
    setRejectedFiles((cur) => cur?.filter((f) => f !== rejection));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    maxSize: 10 * 1024 * 1024, // 25Mb
  });

  useEffect(() => {
    dispatch(resetFiles());
    dispatch(addFiles(uploadedFiles ?? []));
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
        {_files.map((file, index) => (
          <FileUploadWithProgress key={index} file={file} onDelete={onDelete} />
        ))}
        {_storedFiles?.map((file, index) => (
          <UploadedFileComponent
            key={index}
            file={file}
            onDelete={onDeleteUploaded}
          />
        ))}
        {_rejectedFiles?.map((file, index) => (
          <RejectedFile key={index} file={file} onDelete={onDeleteRejected} />
        ))}
      </Stack>
    </>
  );
}
