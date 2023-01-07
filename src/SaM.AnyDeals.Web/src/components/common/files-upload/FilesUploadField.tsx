import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UploadedFile } from "../../../models/uploadedFile";
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      {files.map((fileWrapper, index) => (
        <FileUploadWithProgress
          key={index}
          file={fileWrapper.file}
        />
      ))}
    </>
  );
}
