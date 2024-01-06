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
    this.calculateTotalPrice();
  }

  addCoverages(coverages: Coverage[] | undefined) {
    if (coverages && coverages.length > 0)
      return [
        new BonusProtection(this, coverages[0]),
        new AOPlus(this, coverages[1]),
        new GlassProtection(this, coverages[2]),
      ];

    return [new BonusProtection(this), new AOPlus(this), new GlassProtection(this)];
  }

  addDiscounts(discounts: Discount[] | undefined) {
    if (discounts && discounts.length > 0)
      return [
        new CommercialDiscount(this, discounts[0]),
        new AdviserDiscount(this, discounts[1]),
        new VIPDiscount(this, discounts[2]),
      ];

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

  calculateTotalPrice() {
    let coverageCosts: number = 0;

    this.coverages
      .filter((coverage) => coverage.isSelected)
      .forEach((coverage) => (coverageCosts += coverage.flatCost));
    console.log("Coverage costs:");
    console.log(coverageCosts);
    // const discountCosts = this.discounts.map((discount) => discount.flatCost);

    const totalPrice = this.basePrice + coverageCosts;
    this.totalPrice = totalPrice;
    console.log("total price:");
    console.log(this.totalPrice);
  }

  checkIfAdvisorDiscountShown() {
    const adviserDiscount = this.discounts.filter(
      (discount) => discount.name === DiscountNames.adviser
    )[0] as AdviserDiscount;

    adviserDiscount.checkIfShown(this);
  }

  updatePriceAdjustmentSelectedStatus(name: string) {
    this.updateCoverageSelectedStatus(name);
    this.updateDiscountSelectedStatus(name);
  }

  updateCoverageSelectedStatus(name: string) {
    const matchingCoverage = this.coverages.filter(
      (coverage) => coverage.name === name
    )[0];

    if (!matchingCoverage) return;
    if (!matchingCoverage.setIsSelected) return;

    matchingCoverage.setIsSelected(!matchingCoverage.isSelected, this);
  }

  updateDiscountSelectedStatus(name: string) {
    const matchingDiscount = this.discounts.filter(
      (discount) => discount.name === name
    )[0];

    if (!matchingDiscount) return;
    if (!matchingDiscount.setIsSelected) return;

    matchingDiscount.setIsSelected(!matchingDiscount.isSelected, this);
  }
}
