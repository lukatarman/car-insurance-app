import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class VIPDiscount implements Discount {
  public name: DiscountNames = DiscountNames.vip;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
    this.isShown = this.checkIfShown();
  }

  setCosts() {
    this.percentageCost = 5;
    this.percentageCostOf = "total price";
    this.flatCost = this.user.totalPrice * 0.01 * this.percentageCost;
  }

  checkIfShown() {
    return this.user.vehiclePower > 100 ? true : false;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.checkIfAdvisorDiscountShown();
    this.user.getTotalPrice();
  }
}
