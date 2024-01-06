import { CoverageType, Discount, Surcharge } from "../types/index.js";

export interface UserDTO {
  nameInput: string;
  birthdateInput: Date;
  cityInput: string;
  vehiclePowerInput: number;
  voucherInput?: number;
  priceMatchInput?: number;
  basePrice?: number;
  coverages?: CoverageType[];
  discounts?: Discount[];
  surcharges?: Surcharge[];
  totalPrice?: number;
}
