import { UploadedFile } from "../../../../models/uploadedFile";

export interface UploadedFileComponentProps {
  file: UploadedFile;
  onDelete: (file: UploadedFile) => void;
}
