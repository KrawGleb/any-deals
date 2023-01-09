export class AttachmentType {
  public static readonly Unknown = 0;
  public static readonly Image = 1;
  public static readonly PDF = 2;

  private static stringToType = {
    image: AttachmentType.Image,
    pdf: AttachmentType.PDF,
  };

  public static convert(type: string): number {
    return (
      (this.stringToType[
        type.toLowerCase() as keyof typeof this.stringToType
      ] as number) ?? AttachmentType.Unknown
    );
  }

  public static convertToString(type: number): string {
    // "Image type?"
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
