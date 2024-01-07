import { Discount, SurchargeNames } from "../../types/types.ts";
import { getOneDecimalValue } from "../../utils/numbers.ts";
import { User } from "../user.ts";

export class StrongCarSurcharge implements Discount {
  public name: SurchargeNames = SurchargeNames.strongCar;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;

  constructor(user: User) {
    this.setCosts(user);
    this.checkIfApplied(user);
  }

  setCosts(user: User) {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = getOneDecimalValue(user.vehiclePower * 0.01 * this.percentageCost);
  }

  checkIfApplied(user: User) {
    this.isShown = this.isVehiclePowerOver100(user);
    this.isSelected = this.isVehiclePowerOver100(user);
  }

  private isVehiclePowerOver100(user: User) {
    return user.vehiclePower > 100 ? true : false;
  }
}
