import { createSlice } from "@reduxjs/toolkit";
import { deleteObject, ref } from "firebase/storage";
import { UploadedFile } from "../../models/uploadedFile";
import firebaseStorage from "./firebaseStorage";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [] as UploadedFile[],
  },
  reducers: {
    addFiles(state, action) {
      state.files.push(...action.payload.files);
    },
    deleteFile(state, action) {
      const fileWrapper = state.files.find(
        (fw) => JSON.stringify(fw.file) === JSON.stringify(action.payload.file)
      );

      state.files = state.files.filter((fw) => fw !== fileWrapper);

      if (fileWrapper?.url) {
        const fileRef = ref(firebaseStorage, fileWrapper.url);
        deleteObject(fileRef);
      }
    },
    uploadFile(state, action) {
      state.files = state.files.map((fileWrapper) =>
        JSON.stringify(fileWrapper.file) === JSON.stringify(action.payload.file)
          ? { ...fileWrapper, url: action.payload.url }
          : fileWrapper
      );
    },
  },
});

export const { addFiles, deleteFile, uploadFile } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
