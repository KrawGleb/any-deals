import { FileError } from "react-dropzone";

export interface UploadedFile {
    file: File;
    errors: FileError[];
    url?: string;
}