import "./FilesUploadField.scss";
import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { StoredFile } from "../../../models/storedFile";
import FileUploadWithProgress from "./fileUpload/FileUploadWithProgress";
import { useDispatch, useSelector } from "react-redux";
import { addFiles, deleteFile, resetFiles } from "../../../features/store/fileUploadSlice";
import { FilesUploadFieldProps } from "./FilesUploadFieldProps";
import UploadedFileComponent from "./uploadedFile/UploadedFileComponent";
import Stack from "@mui/material/Stack";
import { RootState } from "../../../features/store/store";
import { UploadableFile } from "../../../models/uploadableFile";

export default function FilesUploadField({
  uploadedFiles,
}: FilesUploadFieldProps) {
  const dispatch = useDispatch();
  const storedFilesCount = useSelector((state: RootState) => state.fileUpload.files.length);

  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [_storedFiles, setStoredFiles] = useState<
    StoredFile[] | undefined
  >(uploadedFiles);

  const onDrop = useCallback(
    (acceptedFiles: File[], _rejectedFiles: FileRejection[]) => {
      let fileId = storedFilesCount;
      const storedFiles: StoredFile[] = [];
      const uploadableFile: UploadableFile[] = [];

      acceptedFiles.forEach((file) => {
        storedFiles.push({
          id: fileId,
          name: file.name,
          type: file.type,
          deleted: false,
          new: true
        });

        uploadableFile.push({
          id: fileId,
          file,
        });

        fileId++;
      });

      setFiles((curr) => [...curr, ...uploadableFile]);
      dispatch(addFiles(storedFiles));
    },
    [dispatch, storedFilesCount]
  );

  const onDelete = (file: UploadableFile) => {
    setFiles((cur) => cur.filter((f) => f.id !== file.id));
    console.log("Delete with id", file.id);
    dispatch(deleteFile({ id: file.id }));
  };

  const onDeleteUploaded = (uploadedFile: StoredFile) => {
    setStoredFiles((cur) => cur?.filter((f) => f.id !== uploadedFile.id));
    dispatch(deleteFile({ id: uploadedFile.id }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
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
        {files.map((file, index) => (
          <FileUploadWithProgress key={index} file={file} onDelete={onDelete} />
        ))}
        {_storedFiles?.map((file, index) => (
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
