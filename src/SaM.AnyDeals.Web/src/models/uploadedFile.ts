import { FileError } from "react-dropzone";
import { SerializableFile } from "./serializableFile";

export interface UploadedFile {
  file: SerializableFile;
  errors: FileError[];
  url?: string;
}
