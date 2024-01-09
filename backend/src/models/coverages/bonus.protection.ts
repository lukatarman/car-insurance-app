import { Coverage, CoverageNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";
import { UserDTO } from "../user.dto.ts";

export class BonusProtection implements Coverage {
  public name: CoverageNames = CoverageNames.protection;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;

  constructor(user: User, input: UserDTO) {
    this.setCosts(user);
    this.isSelected = this.checkIfSelected(input);
  }

  checkIfSelected(input: UserDTO) {
    const coverages = input.coverages;
    if (!coverages || coverages.length === 0) return false;

    return coverages.filter((coverage) => coverage.name === this.name)[0].isSelected;
  }

  setCosts(user: User) {
    this.percentageCost = 12;
    this.percentageCostOf = "base price";
    this.flatCost = this.getRegularFlatCost(user);
  }

  getRegularFlatCost(user: User) {
    return getDecimalValue(user.getBasePrice() * 0.01 * this.percentageCost);
  }

  setFlatCost(cost: number) {
    this.flatCost = cost;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;
    this.setFlatCost(this.getRegularFlatCost(user));

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
