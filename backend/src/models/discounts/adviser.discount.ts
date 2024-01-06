import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class AdviserDiscount implements Discount {
  public name: DiscountNames = DiscountNames.adviser;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User, discount?: Discount) {
    this.setCosts(user);
    this.checkIfShown(user);
    this.isSelected = discount?.isSelected || false;
  }

  setCosts(user: User) {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = user.vehiclePower * 0.01 * this.percentageCost;
  }

  checkIfShown(user: User) {
    this.isShown = this.checkIfAtLeastTwoCoveragesSelected(user.coverages) ? true : false;
    if (!this.isShown) this.setIsSelected(false, user);
  }

  private checkIfAtLeastTwoCoveragesSelected(coverages: User["coverages"]): boolean {
    if (coverages.filter((coverage) => coverage.isSelected).length >= 2) return true;
    return false;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;

    user.calculateTotalPrice();
  }
}
