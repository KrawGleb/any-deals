export class Interest {
  public static readonly Commercial = 0;
  public static readonly Social = 1;

  private static interestToString = {
    0: "Commercial",
    1: "Social",
  };

  public static convert(interest: number) {
    return this.interestToString[
      interest as keyof typeof this.interestToString
    ];
  }
}
