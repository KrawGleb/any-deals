import { SerializableFile } from "../../../../models/serializableFile";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}
