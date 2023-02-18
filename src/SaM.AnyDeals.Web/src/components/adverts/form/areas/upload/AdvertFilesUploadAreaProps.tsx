import { Attachment } from "../../../../../models/api/attachment";
import { AreaProps } from "../AreaProps";

export interface AdvertFilesUploadAreaProps extends AreaProps {
  attachments?: Attachment[];
}
