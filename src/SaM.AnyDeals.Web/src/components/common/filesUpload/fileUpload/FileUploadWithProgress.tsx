import { Grid, LinearProgress } from "@mui/material";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../../../features/store/fileUploadSlice";
import firebaseStorage from "../../../../features/store/firebaseStorage";
import FileHeader from "../fileHeader/FileHeader";
import { FileUploadWithProgressProps } from "./FileUploadWithProgressProps";

export default function FileUploadWithProgress({
  file,
  onDelete,
}: FileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    async function upload() {
      const ref = await uploadFileToFirebase(file.file, setProgress);
      const url = await getDownloadURL(ref);
      dispatch(uploadFile({ id: file.id, url }));
    }

    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item>
      <FileHeader name={file.file.name} file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

function uploadFileToFirebase(
  file: File,
  onProgress: (percentage: number) => void
) {
  return new Promise<StorageReference>((res, _rej) => {
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
