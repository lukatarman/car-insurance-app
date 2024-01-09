import { Discount, DiscountNames } from "../types.ts";
import { getDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";
import { UserDTO } from "../user.dto.ts";

export class CommercialDiscount implements Discount {
  public name: DiscountNames = DiscountNames.commercial;
  public isSelected: boolean;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = true;

  constructor(user: User, input: UserDTO) {
    this.setCosts(user);
    this.isSelected = this.checkIfSelected(input);
  }

  setCosts(user: User) {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = this.getRegularFlatCost(user);
  }

  checkIfSelected(input: UserDTO) {
    const discounts = input.discounts;
    if (!discounts || discounts.length === 0) return false;

    return discounts.filter((discount) => discount.name === this.name)[0].isSelected;
  }

  setFlatCost(cost: number) {
    this.flatCost = cost;
  }

  getRegularFlatCost(user: User) {
    return getDecimalValue(user.getBasePrice() * 0.01 * this.percentageCost);
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;
    this.setFlatCost(this.getRegularFlatCost(user));

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
