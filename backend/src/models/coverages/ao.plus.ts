import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class AOPlus implements Coverage {
  public name: CoverageNames = CoverageNames.ao;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User) {
    this.setCosts(user);
  }

  setCosts(user: User) {
    this.flatCost = user.age < 30 ? 55 : 105;
  }
}
