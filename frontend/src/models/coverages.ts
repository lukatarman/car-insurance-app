import { CoverageNames, DiscountNames, SurchargeNames } from "../types/index";

export class Coverage implements Coverage {
  public name: CoverageNames | DiscountNames | SurchargeNames;
  public isSelected: boolean;
  public percentageCost: number;
  public percentageCostOf: string;
  public flatCost: number;

  constructor(input: Coverage) {
    this.name = input.name;
    this.isSelected = input.isSelected;
    this.percentageCost = input.percentageCost;
    this.percentageCostOf = input.percentageCostOf;
    this.flatCost = input.flatCost || 0;
  }
}
