import { Discount, DiscountNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";
import { UserDTO } from "../user.dto.ts";

export class AdviserDiscount implements Discount {
  public name: DiscountNames = DiscountNames.adviser;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User, input: UserDTO) {
    this.setCosts(user);
    this.checkIfShown(user);
    this.isSelected = this.checkIfSelected(input);
  }

  checkIfSelected(input: UserDTO) {
    const discounts = input.discounts;
    if (!discounts || discounts.length === 0) return false;

    return discounts.filter((discount) => discount.name === this.name)[0].isSelected;
  }

  setCosts(user: User) {
    this.percentageCost = 20;
    this.percentageCostOf = "coverages";
    this.flatCost = this.getRegularFlatCost(user);
  }

  getRegularFlatCost(user: User) {
    return getDecimalValue(user.totalCoverageCost * 0.01 * this.percentageCost);
  }

  setFlatCost(cost: number) {
    this.flatCost = cost;
  }

  checkIfShown(user: User) {
    this.isShown = this.checkIfAtLeastTwoCoveragesSelected(user.coverages) ? true : false;
    if (!this.isShown) this.isSelected = false;
  }

  private checkIfAtLeastTwoCoveragesSelected(coverages: User["coverages"]): boolean {
    if (coverages.filter((coverage) => coverage.isSelected).length >= 2) return true;
    return false;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;
    this.setFlatCost(this.getRegularFlatCost(user));

    user.calculateTotalPrice();
  }
}
