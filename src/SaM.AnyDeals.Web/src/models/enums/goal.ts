export class Goal {
  private static readonly Request = 0;
  private static readonly Offer = 1;

  private static goalToString = {
    0: "Request",
    1: "Offer",
  };

  public static convert(goal: number) {
    return this.goalToString[goal as keyof typeof this.goalToString];
  }
}
