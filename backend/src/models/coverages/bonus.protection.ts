import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class BonusProtection implements Coverage {
  public name: CoverageNames = CoverageNames.protection;
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
    this.percentageCost = 12;
    this.percentageCostOf = "base price";
    this.flatCost = this.user.basePrice * 0.01 * this.percentageCost;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.checkIfAdvisorDiscountShown();
    this.user.getTotalPrice();
  }
}
