import { Coverage, CoverageNames } from "../../types/types.ts";
import { User } from "../user.ts";

export class AOPlus implements Coverage {
  public name: CoverageNames = CoverageNames.ao;
  public isSelected: boolean = false;
  public percentageCost: number = 0;
  public percentageCostOf: string = "";
  public flatCost: number = 0;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.setCosts();
  }

  setCosts() {
    this.flatCost = this.user.age < 30 ? 55 : 105;
  }

  setIsSelected(value: boolean) {
    this.isSelected = value;

    this.user.checkIfAdvisorDiscountShown();
    this.user.getTotalPrice();
  }
}
