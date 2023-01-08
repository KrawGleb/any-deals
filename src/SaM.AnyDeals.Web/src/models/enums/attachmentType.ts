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
}

export default AttachmentType;
