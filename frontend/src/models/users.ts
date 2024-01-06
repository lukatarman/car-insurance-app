import { CoverageType, Discount, Surcharge } from "../types/index";
import { Coverage } from "./coverages";
import { UserDTO } from "./user.dto";

export class User {
  public name: string;
  public birthday: Date;
  public city: string;
  public vehiclePower: number;
  public voucher: number;
  public priceMatch?: number;
  public basePrice?: number;
  public coverages?: CoverageType[];
  public discounts?: Discount[];
  public surcharges?: Surcharge[];
  public totalPrice?: number;

  constructor(input: User) {
    this.name = input.name;
    this.birthday = input.birthday;
    this.city = input.city.toLowerCase();
    this.vehiclePower = input.vehiclePower;
    this.voucher = input.voucher || 0;
    this.priceMatch = input.priceMatch || 0;
    this.basePrice = input.basePrice || 0;
    this.coverages = input.coverages || [];
    this.discounts = input.discounts || [];
    this.surcharges = input.surcharges || [];
    this.totalPrice = input.totalPrice || 0;
  }

  static oneWithEmptyValues = () => {
    return new User({
      name: "",
      birthday: new Date(),
      city: "",
      vehiclePower: 0,
      voucher: 0,
    });
  };

  static oneFromRawData = (data: UserDTO) => {
    const userObj = {
      name: data.nameInput,
      birthday: data.birthdateInput,
      city: data.cityInput,
      vehiclePower: data.vehiclePowerInput,
      voucher: data.voucherInput || 0,
      priceMatch: data.priceMatchInput || 0,
      basePrice: data.basePrice || 0,
      coverages: data.coverages || [],
      discounts: data.discounts || [],
      surcharges: data.surcharges || [],
      totalPrice: data.totalPrice || 0,
    };

    return new User(userObj);
  };

  static oneFromBackend = (data: User) => {
    const dataCopy = { ...data };
    console.log("data copy:");
    console.log(dataCopy);

    const userObj = {
      name: dataCopy.name,
      birthday: dataCopy.birthday,
      city: dataCopy.city,
      vehiclePower: dataCopy.vehiclePower,
      voucher: dataCopy.voucher || 0,
      priceMatch: dataCopy.priceMatch || 0,
      basePrice: dataCopy.basePrice || 0,
      coverages: dataCopy.coverages || [],
      discounts: dataCopy.discounts || [],
      surcharges: dataCopy.surcharges || [],
      totalPrice: data.totalPrice || 0,
    };

    return new User(userObj);
  };

  private static instantiateCoverages(coverages: CoverageType[]) {
    return coverages.map((coverage) => new Coverage(coverage));
  }
}
