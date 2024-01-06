import { ageSurcharges, cityPrices } from "../assets/base.price.data.mock.ts";
import { Coverage, Discount, DiscountNames, Surcharge } from "../types/types.ts";
import { AOPlus } from "./coverages/ao.plus.ts";
import { BonusProtection } from "./coverages/bonus.protection.ts";
import { GlassProtection } from "./coverages/glass.protection.ts";
import { AdviserDiscount } from "./discounts/adviser.discount.ts";
import { CommercialDiscount } from "./discounts/commercial.discount.ts";
import { VIPDiscount } from "./discounts/vip.discount.ts";
import { StrongCarSurcharge } from "./surcharges/strong.car.surcharge.ts";
import { UserDTO } from "./user.dto.ts";

export class User {
  public name: string;
  public birthday: Date;
  public city: string;
  public vehiclePower: number;
  public voucher: number;
  public priceMatch: number;
  public basePrice: number;
  public coverages: Coverage[];
  public discounts: Discount[];
  public surcharges: Surcharge[];
  public totalPrice: number;

  constructor(input: UserDTO) {
    this.name = input.name;
    this.birthday = input.birthday;
    this.city = input.city.toLowerCase();
    this.vehiclePower = input.vehiclePower;
    this.voucher = input.voucher || 0;
    this.priceMatch = input.priceMatch || 0;
    this.basePrice = this.getBasePrice();
    this.coverages = this.addCoverages(input.coverages);
    this.discounts = this.addDiscounts(input?.discounts);
    this.surcharges = this.addSurcharges(input?.surcharges);
    this.totalPrice = 0;
    this.getTotalPrice();
  }

  addCoverages(coverages: Coverage[] | undefined) {
    if (coverages && coverages.length > 0) return coverages;

    return [new BonusProtection(this), new AOPlus(this), new GlassProtection(this)];
  }

  addDiscounts(discounts: Discount[] | undefined) {
    if (discounts && discounts.length > 0) return discounts;

    return [
      new CommercialDiscount(this),
      new AdviserDiscount(this),
      new VIPDiscount(this),
    ];
  }

  addSurcharges(surcharges: Surcharge[] | undefined) {
    if (surcharges && surcharges.length > 0) return surcharges;

    return [new StrongCarSurcharge(this)];
  }

  getBasePrice() {
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

  get age() {
    return Math.floor(
      (new Date().getTime() - new Date(this.birthday).getTime()) / 3.15576e10
    );
  }

  getTotalPrice() {
    this.totalPrice = 5000;
  }

  checkIfAdvisorDiscountShown() {
    const adviserDiscount = this.discounts.filter(
      (discount) => discount.name === DiscountNames.adviser
    )[0] as AdviserDiscount;

    adviserDiscount.checkIfShown(this);
  }

  updateCoverageSelectedStatus(name: string) {
    return this.coverages
      .filter((coverage) => coverage.name === name)
      .map((coverage) => {
        return { ...coverage, isSelected: !coverage.isSelected };
      })[0];
  }

  updateDiscountSelectedStatus(name: string) {
    return this.discounts
      .filter((discount) => discount.name === name)
      .map((discount) => {
        return { ...discount, isSelected: !discount.isSelected };
      })[0];
  }

  updateSurchargeSelectedStatus(name: string) {
    return this.surcharges
      .filter((surcharge) => surcharge.name === name)
      .map((surcharge) => {
        return { ...surcharge, isSelected: !surcharge.isSelected };
      })[0];
  }
}
