import { SerializableFile } from "../../models/serializableFile";

export function mapFile(file: File): SerializableFile {
  return {
    name: file.name,
    lastModified: file.lastModified,
    webkitRelativePath: file.webkitRelativePath,
    size: file.size,
    type: file.type,
  } as SerializableFile;
}
