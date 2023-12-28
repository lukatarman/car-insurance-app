import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class GlassProtection implements Coverage {
  public name: CoverageNames = CoverageNames.protection;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User) {
    this.setCosts(user);
  }

  setCosts(user: User) {
    this.percentageCost = 80;
    this.percentageCostOf = "vehicle power";
    this.flatCost = user.vehiclePower * 0.01 * this.percentageCost;
  }
}
