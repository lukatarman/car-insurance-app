import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class CommercialDiscount implements Discount {
  public name: DiscountNames = DiscountNames.commercial;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = true;

  constructor(user: User) {
    this.setCosts(user);
  }

  setCosts(user: User) {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = user.basePrice * 0.01 * this.percentageCost;
  }
}
