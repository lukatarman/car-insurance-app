import { Discount, DiscountNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";
import { UserDTO } from "../user.dto.ts";

export class VIPDiscount implements Discount {
  public name: DiscountNames = DiscountNames.vip;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User, input: UserDTO) {
    this.setCosts();
    this.isShown = this.checkIfShown(user);
    this.isSelected = this.checkIfSelected(input);
  }

  setCosts() {
    this.percentageCost = 5;
    this.percentageCostOf = "total price";
  }

  checkIfSelected(input: UserDTO) {
    const discounts = input.discounts;
    if (!discounts || discounts.length === 0) return false;

    return discounts.filter((discount) => discount.name === this.name)[0].isSelected;
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
