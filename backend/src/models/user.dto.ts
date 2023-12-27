import { Coverage } from "./coverage.ts";

export interface UserDTO {
  name: string;
  birthday: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  coverages?: Coverage[];
}
