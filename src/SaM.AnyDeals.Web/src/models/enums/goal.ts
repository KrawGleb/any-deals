export class Goal {
  public static readonly Request = 0;
  public static readonly Offer = 1;

  private static goalMap = new Map<number, string>([
    [0, "Request"],
    [1, "Offer"],
  ]);

  public static convert(goal: number) {
    return this.goalMap.get(goal);
  }
}
