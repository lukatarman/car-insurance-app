import { Discount, DiscountNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class CommercialDiscount implements Discount {
  public name: DiscountNames = DiscountNames.commercial;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = true;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
  }

  setCosts() {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = this.user.basePrice * 0.01 * this.percentageCost;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.checkIfAdvisorDiscountShown();
    this.user.getTotalPrice();
  }
}
