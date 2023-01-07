export class AttachmentType {
  static Unknown = 0;
  static Image = 1;
  static PDF = 2;

  public static convert(type: string): number {
    if (type.indexOf("image") !== -1) return AttachmentType.Image;
    if (type.indexOf("pdf") !== -1) return AttachmentType.PDF;

    return AttachmentType.Unknown;
  }
}

export default AttachmentType;