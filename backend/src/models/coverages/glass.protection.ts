import { Coverage, CoverageNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";
import { UserDTO } from "../user.dto.ts";

export class GlassProtection implements Coverage {
  public name: CoverageNames = CoverageNames.glass;
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
    this.percentageCost = 80;
    this.percentageCostOf = "vehicle power";
    this.flatCost = this.getRegularFlatCost(user);
  }

  setFlatCost(cost: number) {
    this.flatCost = cost;
  }

  getRegularFlatCost(user: User) {
    return getDecimalValue(user.vehiclePower * 0.01 * this.percentageCost);
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;
    this.setFlatCost(this.getRegularFlatCost(user));

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
