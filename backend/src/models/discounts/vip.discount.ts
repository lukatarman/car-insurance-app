import { Discount, DiscountNames } from "../../types/types.ts";
import { getOneDecimalValue } from "../../utils/numbers.ts";
// import { getOneDecimalValue } from "../../utils/numbers.ts";
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

  setFlatCost(price: number) {
    this.flatCost = getOneDecimalValue(price * 0.01 * this.percentageCost);
  }

  checkIfShown(user: User) {
    return user.vehiclePower > 100 ? true : false;
  }

  setIsSelected(value: boolean, user: User) {
    this.isSelected = value;

    user.checkIfAdvisorDiscountShown();
    user.calculateTotalPrice();
  }
}
