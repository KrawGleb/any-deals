export class Status {
  public static readonly OnModeration = 0;
  public static readonly Accepted = 1;
  public static readonly Rejected = 2;

  private static readonly statusToText = new Map<number, string>([
    [Status.OnModeration, "On Moderation"],
    [Status.Accepted, "Accepted"],
    [Status.Rejected, "Rejected"],
  ]);

  public static convert(status: number): string | undefined {
    return Status.statusToText.get(status);
  }
}
