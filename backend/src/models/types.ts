import { User } from "./user.ts";

export enum CoverageNames {
  protection = "Bonus protection",
  ao = "AO+",
  glass = "Glass protection",
}

export interface Coverage {
  name: CoverageNames | DiscountNames | SurchargeNames;
  isSelected: boolean;
  percentageCost: number;
  percentageCostOf: string;
  flatCost: number;
  setCosts: (user: User) => void;
  checkIfSelected?: (user: User) => boolean;
  setFlatCost: (price: number) => void;
  getRegularFlatCost?: (user: User) => number;
  setIsSelected?: (value: boolean, user: User) => void;
}

export enum DiscountNames {
  commercial = "Commercial discount",
  adviser = "Adviser discount",
  vip = "VIP discount",
}

export interface Discount extends Coverage {
  isShown: boolean;
}

export enum SurchargeNames {
  strongCar = "Strong car surcharge",
}

export interface Surcharge extends Discount {}
