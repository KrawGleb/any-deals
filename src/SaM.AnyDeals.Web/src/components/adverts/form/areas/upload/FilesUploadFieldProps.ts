import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form";
import { StoredFile } from "../../../../../models/storedFile";

export interface FilesUploadFieldProps {
  uploadedFiles?: StoredFile[];

  field?: ControllerRenderProps<any, "files">;
  fieldState?: ControllerFieldState;
  formState?: UseFormStateReturn<any>;
}
