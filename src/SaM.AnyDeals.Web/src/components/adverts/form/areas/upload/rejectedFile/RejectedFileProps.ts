import { FileRejection } from "react-dropzone";

export interface RejectedFileProps {
  file: FileRejection;
  onDelete: (file: FileRejection) => void;
}
