export class Interest {
  public static readonly Commercial = 0;
  public static readonly Social = 1;

  private static readonly interestMap = new Map<number, string>([
    [0, "Commercial"],
    [1, "Social"],
  ]);

  public static convert(interest: number) {
    return this.interestMap.get(interest);
  }
}
