import { Coverage, CoverageNames } from "../../types/types.ts";
import { getOneDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";

export class BonusProtection implements Coverage {
  public name: CoverageNames = CoverageNames.protection;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User, coverage?: Coverage) {
    this.setCosts(user);
    this.isSelected = coverage?.isSelected || false;
  }

  setCosts(user: User) {
    this.percentageCost = 12;
    this.percentageCostOf = "base price";
    this.flatCost = getOneDecimalValue(user.basePrice * 0.01 * this.percentageCost);
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
