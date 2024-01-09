import { ageSurcharges, cityPrices } from "../assets/base.price.data.mock.ts";
import { Coverage, Discount, DiscountNames, Surcharge } from "./types.ts";
import {
  addValues,
  adjustValuesProportionally,
  getDecimalValue,
  getPercentageOf,
} from "../utils/numbers.ts";
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
  public totalCoverageCost: number;
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
    this.totalCoverageCost = addValues(this.getFlatAdjustmentPrices(this.coverages));
    this.discounts = this.addDiscounts(input?.discounts);
    this.surcharges = this.addSurcharges(input?.surcharges);
    this.totalPrice = 0;
    this.calculateTotalPrice();
    this.vipDiscount?.calculateFlatCost(this.totalPrice);
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
    if (surcharges && surcharges.length > 0) return [new StrongCarSurcharge(this)];

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
    this.basePrice = this.getBasePrice();

    const coverageCosts = this.getFlatAdjustmentPrices(this.coverages);
    const surchargeCosts = this.getFlatAdjustmentPrices(this.surcharges);
    const discountCosts = this.getFlatAdjustmentPrices(this.discounts);

    const totalSurchargeCost = addValues(surchargeCosts);
    const totalSavedViaDiscounts = addValues(discountCosts);

    console.log("COSTS");
    console.log(this.basePrice);
    console.log(coverageCosts);
    console.log(surchargeCosts);
    console.log(discountCosts);
    console.log(totalSurchargeCost);
    console.log(totalSavedViaDiscounts);
    console.log(this.totalCoverageCost);
    console.log("test");

    let totalPrice =
      this.basePrice +
      this.totalCoverageCost +
      totalSurchargeCost -
      totalSavedViaDiscounts;

    this.totalPrice = this.applyVipPriceAdjustments(totalPrice);
    console.log("pre recalculate total price:");
    console.log(totalPrice);

    const updatedDiscountCosts = this.getFlatAdjustmentPrices(this.discounts);
    // console.log("User:");
    // console.log(this);
    console.log("updated Discount COSTS");
    console.log(updatedDiscountCosts);

    if (this.priceMatch)
      this.recalculateValues(coverageCosts, surchargeCosts, updatedDiscountCosts);

    // if (this.voucher) price -= this.voucher;
    // if (price <= 0) price = 0;
  }

  recalculateValues(
    coverageCosts: number[],
    surchargeCosts: number[],
    discountCosts: number[]
  ) {
    const priceDifference = this.priceMatch - this.totalPrice;

    const totalPriceIncrease =
      this.basePrice + addValues(coverageCosts) + addValues(surchargeCosts);
    const totalPriceDecrease = addValues(discountCosts);
    const absolutePriceChange = totalPriceIncrease + totalPriceDecrease;

    const priceIncreaseProportionalPool =
      getPercentageOf(absolutePriceChange, totalPriceIncrease) * 0.01 * priceDifference;
    const priceDecreaseProportionalPool =
      getPercentageOf(absolutePriceChange, totalPriceDecrease) * -0.01 * priceDifference;

    const coverageCostsPriceChange =
      priceIncreaseProportionalPool *
      0.01 *
      getPercentageOf(totalPriceIncrease, this.totalCoverageCost);

    const surchargeCostsPriceChange =
      priceIncreaseProportionalPool *
      0.01 *
      getPercentageOf(totalPriceIncrease, addValues(surchargeCosts));

    this.basePrice = getDecimalValue(
      this.basePrice +
        (priceIncreaseProportionalPool -
          coverageCostsPriceChange -
          surchargeCostsPriceChange)
    );

    const adjustedCoverageCosts = adjustValuesProportionally(
      coverageCosts,
      coverageCostsPriceChange
    );

    const adjustedSurchargeCosts = adjustValuesProportionally(
      surchargeCosts,
      surchargeCostsPriceChange
    );
    const adjustedDiscountCosts = adjustValuesProportionally(
      discountCosts,
      priceDecreaseProportionalPool
    );

    this.modifyPriceAdjustments("coverages", adjustedCoverageCosts);
    this.modifyPriceAdjustments("surcharges", adjustedSurchargeCosts);
    this.modifyPriceAdjustments("discounts", adjustedDiscountCosts);

    this.totalPrice = getDecimalValue(
      this.basePrice +
        addValues(this.getFlatAdjustmentPrices(this.coverages)) +
        addValues(this.getFlatAdjustmentPrices(this.surcharges)) -
        addValues(this.getFlatAdjustmentPrices(this.discounts))
    );
  }

  modifyPriceAdjustments(
    adjustmentType: "coverages" | "discounts" | "surcharges",
    values: number[]
  ) {
    if (!this[adjustmentType] || this[adjustmentType].length === 0) return;

    this[adjustmentType].forEach((adjustment, index) => {
      adjustment.setFlatCost(getDecimalValue(values[index]));
    });
  }

  getFlatAdjustmentPrices(adjustment: Coverage[] | Discount[] | Surcharge[]) {
    if (!adjustment) return [0];

    return adjustment.map((adjustment) => {
      if (!adjustment.isSelected) return 0;

      return adjustment.flatCost;
    });
  }

  applyVipPriceAdjustments(totalPrice: number) {
    this.vipDiscount?.calculateFlatCost(totalPrice);

    if (this.vipDiscount?.isSelected) totalPrice -= this.vipDiscount.flatCost;

    return getDecimalValue(totalPrice);
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
