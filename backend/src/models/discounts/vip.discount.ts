import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class VIPDiscount implements Discount {
  public name: DiscountNames = DiscountNames.vip;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User) {
    this.setCosts(user);
    this.isShown = this.checkIfShown(user);
  }

  setCosts(user: User) {
    this.percentageCost = 5;
    this.percentageCostOf = "total price";
    this.flatCost = user.totalPrice * 0.01 * this.percentageCost;
  }

  checkIfShown(user: User) {
    return user.vehiclePower > 100 ? true : false;
  }
}
