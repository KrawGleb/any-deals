import { FileError } from "react-dropzone";
import { SerializableFile } from "./serializableFile";

export interface UploadedFile {
  name: string;
  file: SerializableFile;
  errors: FileError[];
  url?: string;
}
