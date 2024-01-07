import { Coverage, CoverageNames } from "../../types/types.ts";
import { getOneDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";

export class AOPlus implements Coverage {
  public name: CoverageNames = CoverageNames.ao;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User, coverage?: Coverage) {
    this.setCosts(user);
    this.isSelected = coverage?.isSelected || false;
  }

  setCosts(user: User) {
    this.flatCost = getOneDecimalValue(user.age < 30 ? 55 : 105);
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
