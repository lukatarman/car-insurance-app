import { Coverage, Discount, Surcharge } from "../types/index.js";

export class User {
  public name: string;
  public birthday: Date;
  public city: string;
  public vehiclePower: number;
  public voucher: number;
  public priceMatch?: number;
  public basePrice?: number;
  public coverages?: Coverage[];
  public discounts?: Discount[];
  public surcharges?: Surcharge[];

  constructor(input: User) {
    this.name = input.name;
    this.birthday = input.birthday;
    this.city = input.city.toLowerCase();
    this.vehiclePower = input.vehiclePower;
    this.voucher = input.voucher || 0;
    this.priceMatch = input.priceMatch || 0;
  }
}
