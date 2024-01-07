import { ageSurcharges, cityPrices } from "../assets/base.price.data.mock.ts";
import { Coverage, Discount, DiscountNames, Surcharge } from "../types/types.ts";
import { getOneDecimalValue } from "../utils/numbers.ts";
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
  public totalCoverageCost: number = 0;
  public totalPrice: number;

  constructor(input: UserDTO) {
    this.name = input.name;
    this.birthday = input.birthday;
    this.city = input.city.toLowerCase();
    this.vehiclePower = input.vehiclePower;
    this.voucher = input.voucher || 0;
    this.priceMatch = input.priceMatch || 0;
    this.basePrice = this.getBasePrice();
    this.coverages = this.addCoverages(input?.coverages);
    this.totalCoverageCost = this.calculateTotalPriceAdjustment(this.coverages);
    this.discounts = this.addDiscounts(input?.discounts);
    this.surcharges = this.addSurcharges(input?.surcharges);
    this.totalPrice = 0;
    this.calculateTotalPrice();
    this.vipDiscount?.setFlatCost(this.totalPrice);
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
    const totalSurchargeCost = this.calculateTotalPriceAdjustment(this.surcharges);
    const totalSavedViaDiscounts = this.calculateTotalPriceAdjustment(this.discounts);

    let totalPrice =
      this.basePrice +
      this.totalCoverageCost +
      totalSurchargeCost -
      totalSavedViaDiscounts;

    const adjustedTotalPrice = this.addAdditionalTotalPriceAdjustments(totalPrice);

    this.totalPrice = getOneDecimalValue(adjustedTotalPrice - this.voucher);
  }

  calculateTotalPriceAdjustment(adjustment: Coverage[] | Discount[] | Surcharge[]) {
    if (!adjustment) return 0;

    return adjustment.reduce((accumulator, currentValue) => {
      if (!currentValue.isSelected) return accumulator;
      if (currentValue.name === DiscountNames.vip) return accumulator;

      return accumulator + currentValue.flatCost;
    }, 0);
  }

  addAdditionalTotalPriceAdjustments(price: number) {
    if (this.vipDiscount?.isSelected) return price - this.vipDiscount.flatCost;
    return price;
  }

  get vipDiscount() {
    if (!this.discounts) return;

    return this.discounts.find((discount) => discount.name === DiscountNames.vip) as
      | VIPDiscount
      | undefined;
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
