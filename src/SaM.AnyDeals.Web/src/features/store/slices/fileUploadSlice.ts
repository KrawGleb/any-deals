import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredFile } from "../../../models/storedFile";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [] as StoredFile[],
  },
  reducers: {
    resetFiles(state) {
      state.files = [];
    },
    addFiles(state, action: PayloadAction<StoredFile[]>) {
      state.files.push(...action.payload);
    },
    deleteFile(state, action: PayloadAction<{ id: number }>) {
      const fileWrapper = state.files.find((fw) => fw.id === action.payload.id);
      if (fileWrapper) fileWrapper.deleted = true;
    },
    uploadFile(state, action: PayloadAction<{ id: number; url: string }>) {
      const fileWrapper = state.files.find((fw) => fw.id === action.payload.id);
      if (fileWrapper) fileWrapper.url = action.payload.url;
    },
  },
});

export const { addFiles, deleteFile, uploadFile, resetFiles } =
  fileUploadSlice.actions;

export default fileUploadSlice.reducer;
