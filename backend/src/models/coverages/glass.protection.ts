import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class GlassProtection implements Coverage {
  public name: CoverageNames = CoverageNames.glass;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
  }

  setCosts() {
    this.percentageCost = 80;
    this.percentageCostOf = "vehicle power";
    this.flatCost = this.user.vehiclePower * 0.01 * this.percentageCost;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.checkIfAdvisorDiscountShown();
    this.user.getTotalPrice();
  }
}
