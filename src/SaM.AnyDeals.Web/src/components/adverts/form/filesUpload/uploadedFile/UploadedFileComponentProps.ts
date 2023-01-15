import { StoredFile } from "../../../../../models/storedFile";

export interface UploadedFileComponentProps {
  file: StoredFile;
  onDelete: (file: StoredFile) => void;
}
