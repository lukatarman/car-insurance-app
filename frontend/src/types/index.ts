import { User } from "../models/users";

export enum CoverageNames {
  protection = "Bonus protection",
  ao = "AO+",
  glass = "Glass protection",
}

export type CoverageType = {
  name: CoverageNames | DiscountNames | SurchargeNames;
  isSelected: boolean;
  percentageCost: number;
  percentageCostOf: string;
  flatCost: number;
};

export enum DiscountNames {
  commercial = "Commercial discount",
  adviser = "Adviser discount",
  vip = "VIP discount",
}

export interface Discount extends CoverageType {
  isShown: boolean;
}

export enum SurchargeNames {
  strongCar = "Strong car surcharge",
}

export interface Surcharge extends Discount {}
