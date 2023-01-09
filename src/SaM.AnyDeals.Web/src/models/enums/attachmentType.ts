export class AttachmentType {
  public static readonly Unknown = 0;
  public static readonly Image = 1;
  public static readonly PDF = 2;

  public static convert(type: string): number {
    if (type.toLocaleLowerCase().indexOf("image") >= 0)
      return AttachmentType.Image;
    if (type.toLocaleLowerCase().indexOf("pdf") >= 0) return AttachmentType.PDF;

    return AttachmentType.Unknown;
  }

  public static convertToString(type: number): string {
    switch (type) {
      case 1:
        return "image";
      case 2:
        return "pdf";
      default:
        return "unknown";
    }
  }
}

export default AttachmentType;
