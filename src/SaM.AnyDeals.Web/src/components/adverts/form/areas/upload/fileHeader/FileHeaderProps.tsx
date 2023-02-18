import { FileRejection } from "react-dropzone";
import { StoredFile } from "../../../../../../models/storedFile";
import { UploadableFile } from "../../../../../../models/uploadableFile";

export interface FileHeaderProps {
  name: string;
  file: UploadableFile | StoredFile | FileRejection;
  onDelete:
    | ((file: UploadableFile) => void)
    | ((file: StoredFile) => void)
    | ((file: FileRejection) => void);
  color?: string;
}
