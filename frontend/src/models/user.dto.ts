import { CoverageType, Discount, Surcharge } from "../types/index.js";

export interface UserDTO {
  nameInput: string;
  birthdateInput: string;
  cityInput: string;
  vehiclePowerInput: string;
  voucherInput?: string;
  priceMatchInput?: string;
  basePrice?: string;
  coverages?: CoverageType[];
  discounts?: Discount[];
  surcharges?: Surcharge[];
  totalPrice?: string;
}
