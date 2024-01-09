import { Coverage, Discount, Surcharge } from "./types.ts";

export interface UserDTO {
  name: string;
  birthday: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  coverages?: Coverage[];
  discounts?: Discount[];
  surcharges?: Surcharge[];
}
