import { Discount, DiscountNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
// import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";

export class VIPDiscount implements Discount {
  public name: DiscountNames = DiscountNames.vip;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User, discount?: Discount) {
    this.setCosts();
    this.isShown = this.checkIfShown(user);
    this.isSelected = discount?.isSelected || false;
  }

  setCosts() {
    this.percentageCost = 5;
    this.percentageCostOf = "total price";
  }

  calculateFlatCost(totalPrice: number) {
    this.flatCost = getDecimalValue(totalPrice * 0.01 * this.percentageCost);
  }

  setFlatCost(cost: number) {
    this.flatCost = cost;
  }

  checkIfShown(user: User) {
    return user.vehiclePower > 80 ? true : false;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;
    this.setFlatCost(user.totalPrice);

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
