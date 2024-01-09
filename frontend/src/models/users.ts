import { CoverageType, Discount, Surcharge } from "../types/index";
import { UserDTO } from "./user.dto";

export class User {
  public name: string = "";
  public birthday: Date = new Date();
  public city: string = "";
  public vehiclePower: number = 0;
  public voucher?: number = 0;
  public priceMatch?: number = 0;
  public basePrice: number = 0;
  public coverages: CoverageType[] = [];
  public discounts: Discount[] = [];
  public surcharges: Surcharge[] = [];
  public totalPrice: number = 0;

  //prettier-ignore
  static oneFromRawData = (data: UserDTO) => {
    const user        = new User();
    user.name         = data.nameInput;
    user.birthday     = data.birthdateInput;
    user.city         = data.cityInput;
    user.vehiclePower = data.vehiclePowerInput;
    user.voucher      = data.voucherInput || 0;
    user.priceMatch   = data.priceMatchInput || 0;

    return user;
  };

  //prettier-ignore
  static oneFromBackend = (data: User) => {
    const dataCopy = { ...data };

    const user        = new User();
    user.name         = dataCopy.name;
    user.birthday     = dataCopy.birthday;
    user.city         = dataCopy.city;
    user.vehiclePower = dataCopy.vehiclePower;
    user.voucher      = dataCopy.voucher;
    user.priceMatch   = dataCopy.priceMatch;
    user.basePrice    = dataCopy.basePrice;
    user.coverages    = dataCopy.coverages;
    user.discounts    = dataCopy.discounts;
    user.surcharges   = dataCopy.surcharges;
    user.totalPrice   = dataCopy.totalPrice;

    return user;
  };

  updateFormValues(data: UserDTO) {
    this.name = data.nameInput;
    this.birthday = data.birthdateInput;
    this.city = data.cityInput;
    this.vehiclePower = data.vehiclePowerInput;
    this.voucher = data.voucherInput;
    this.priceMatch = data.priceMatchInput;
  }
}
