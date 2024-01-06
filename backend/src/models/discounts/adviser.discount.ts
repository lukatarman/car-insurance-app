import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class AdviserDiscount implements Discount {
  public name: DiscountNames = DiscountNames.adviser;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
    this.checkIfShown();
  }

  setCosts() {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = this.user.vehiclePower * 0.01 * this.percentageCost;
  }

  checkIfShown() {
    this.isShown = this.checkIfAtLeastTwoCoveragesSelected(this.user.coverages)
      ? true
      : false;
  }

  private checkIfAtLeastTwoCoveragesSelected(coverages: User["coverages"]): boolean {
    if (coverages.filter((coverage) => coverage.isSelected).length >= 2) return true;
    return false;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.getTotalPrice();
  }
}
