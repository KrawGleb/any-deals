import { UploadedFile } from "../../../../models/uploadedFile";

export interface FileHeaderProps {
  file: File | UploadedFile;
  onDelete: ((file: File) => void) | ((file: UploadedFile) => void);
}
