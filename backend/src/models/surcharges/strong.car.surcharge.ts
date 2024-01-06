import { Discount, SurchargeNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class StrongCarSurcharge implements Discount {
  public name: SurchargeNames = SurchargeNames.strongCar;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  public isShown: boolean = false;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
    this.checkIfApplied();
  }

  setCosts() {
    this.percentageCost = 10;
    this.percentageCostOf = "base price";
    this.flatCost = this.user.vehiclePower * 0.01 * this.percentageCost;
  }

  checkIfApplied() {
    this.isShown = this.isVehiclePowerOver100();
    this.isSelected = this.isVehiclePowerOver100();
  }

  private isVehiclePowerOver100() {
    return this.user.vehiclePower > 100 ? true : false;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.getTotalPrice();
  }
}
