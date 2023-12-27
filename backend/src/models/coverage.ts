import { User } from "./user.ts";

export enum CoverageNames {
  protection = "Bonus protection",
  ao = "AO+",
  glass = "Glass protection",
}

export class Coverage {
  public name: CoverageNames;
  public isSelected: boolean;
  public percentageCost: number;
  public percentageCostOf: string;
  public flatCost: number;

  constructor(user: User, coverage: CoverageNames) {
    this.name = coverage;
    this.isSelected = false;
    this.percentageCost = 0;
    this.percentageCostOf = "";
    this.flatCost = 0;
    this.setCosts(user);
  }

  setCosts(user: User) {
    if (this.name === CoverageNames.protection) this.setProtectionCosts(user);
    if (this.name === CoverageNames.ao) this.setAoCosts(user);
    if (this.name === CoverageNames.glass) this.setGlassCosts(user);
  }

  setProtectionCosts(user: User) {
    this.percentageCost = 12;
    this.percentageCostOf = "base price";
    this.flatCost = user.basePrice * 0.01 * this.percentageCost;
  }

  setAoCosts(user: User) {
    this.flatCost = user.age < 30 ? 55 : 105;
  }

  setGlassCosts(user: User) {
    this.percentageCost = 80;
    this.percentageCostOf = "vehicle power";
    this.flatCost = user.vehiclePower * 0.01 * this.percentageCost;
  }
}
