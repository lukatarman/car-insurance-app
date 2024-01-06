import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class GlassProtection implements Coverage {
  public name: CoverageNames = CoverageNames.glass;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User, coverage?: Coverage) {
    this.setCosts(user);
    this.isSelected = coverage?.isSelected || false;
  }

  setCosts(user: User) {
    this.percentageCost = 80;
    this.percentageCostOf = "vehicle power";
    this.flatCost = user.vehiclePower * 0.01 * this.percentageCost;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
