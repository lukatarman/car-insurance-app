import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class AdviserDiscount implements Discount {
  public name: DiscountNames = DiscountNames.adviser;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User) {
    this.setCosts(user);
  }

  setCosts(user: User) {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = user.vehiclePower * 0.01 * this.percentageCost;
  }

  checkIfShown(user: User) {
    this.isShown = this.checkIfAtLeastTwoCoveragesSelected(user.coverages) ? true : false;
  }

  private checkIfAtLeastTwoCoveragesSelected(coverages: User["coverages"]): boolean {
    if (coverages.filter((coverage) => coverage.isSelected).length >= 2) return true;
    return false;
  }
}
