import { Grid, LinearProgress } from "@mui/material";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import firebaseStorage from "../../../../features/store/firebaseStorage";
import FileHeader from "../fileHeader/FileHeader";
import { FileUploadWithProgressProps } from "./FileUploadWithProgressProps";

export default function FileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}: FileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const ref = await uploadFile(file, setProgress);
      onUpload(file, await getDownloadURL(ref));
    }

    upload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  return new Promise<StorageReference>((res, rej) => {
    const storageRef = ref(firebaseStorage, `${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(Math.round(percentage));
    });

    uploadTask.on("state_changed", {
      complete: () => res(storageRef),
    });
  });
}
