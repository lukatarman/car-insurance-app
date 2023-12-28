import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class BonusProtection implements Coverage {
  public name: CoverageNames = CoverageNames.protection;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User) {
    this.setCosts(user);
  }

  setCosts(user: User) {
    this.percentageCost = 12;
    this.percentageCostOf = "base price";
    this.flatCost = user.basePrice * 0.01 * this.percentageCost;
  }
}
