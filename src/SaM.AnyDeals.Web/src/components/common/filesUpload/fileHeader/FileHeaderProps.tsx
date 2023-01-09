import { StoredFile } from "../../../../models/storedFile";
import { UploadableFile } from "../../../../models/uploadableFile";

export interface FileHeaderProps {
  name: string;
  file: UploadableFile | StoredFile;
  onDelete: ((file: UploadableFile) => void) | ((file: StoredFile) => void);
}
