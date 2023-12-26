import { ageSurcharges, cityPrices } from "../assets/base.price.data.mock.ts";
import { UserDTO } from "./user.dto.ts";

export class User {
  public name: string;
  public birthday: Date;
  public city: string;
  public vehiclePower: number;
  public voucher: number;
  public priceMatch: number;

  constructor(input: UserDTO) {
    this.name = input.name;
    this.birthday = input.birthday;
    this.city = input.city.toLowerCase();
    this.vehiclePower = input.vehiclePower;
    this.voucher = input.voucher || 0;
    this.priceMatch = input.priceMatch || 0;
  }

  get basePrice() {
    const cityPrice = this.cityPrice;

    return cityPrice + cityPrice * 0.01 * this.ageSurcharge;
  }

  private get cityPrice() {
    const defaultPrice = 150;
    return cityPrices.find((city) => this.city === city.location)?.price || defaultPrice;
  }

  private get ageSurcharge() {
    const defaultSurcharge = 0;
    return (
      ageSurcharges.find((age) => this.age <= age.maxAge)?.percentageSurcharge ||
      defaultSurcharge
    );
  }

  private get age() {
    return Math.floor(
      (new Date().getTime() - new Date(this.birthday).getTime()) / 3.15576e10
    );
  }

  get totalPrice() {
    return this.basePrice - this.voucher;
  }
}
