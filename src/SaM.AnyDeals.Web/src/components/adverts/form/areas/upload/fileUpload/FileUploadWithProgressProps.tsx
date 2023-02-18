import { UploadableFile } from "../../../../../../models/uploadableFile";

export interface FileUploadWithProgressProps {
  file: UploadableFile;
  onDelete: (file: UploadableFile) => void;
}
