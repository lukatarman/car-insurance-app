import { ageSurcharges, cityPrices } from "../assets/base.price.data.mock.ts";
import { Coverage, Discount, DiscountNames, Surcharge } from "./types.ts";
import {
  addArrayValues,
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
    this.coverages = this.addCoverages(input);
    this.totalCoverageCost = addArrayValues(this.getFlatAdjustmentPrices(this.coverages));
    this.discounts = this.addDiscounts(input);
    this.surcharges = this.addSurcharges();
    this.totalPrice = 0;
    this.calculateTotalPrice();
    this.vipDiscount?.calculateFlatCost(this.totalPrice);
  }

  addCoverages(input: UserDTO) {
    return [
      new BonusProtection(this, input),
      new AOPlus(this, input),
      new GlassProtection(this, input),
    ];
  }

  addDiscounts(input: UserDTO) {
    return [
      new CommercialDiscount(this, input),
      new AdviserDiscount(this, input),
      new VIPDiscount(this, input),
    ];
  }

  addSurcharges() {
    return [new StrongCarSurcharge(this)];
  }

  getBasePrice() {
    return this.cityPrice + this.cityPrice * 0.01 * this.ageSurcharge;
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

    const totalSurchargeCost = addArrayValues(surchargeCosts);
    const totalSavedViaDiscounts = addArrayValues(discountCosts);

    let totalPrice =
      this.basePrice +
      this.totalCoverageCost +
      totalSurchargeCost -
      totalSavedViaDiscounts;

    this.totalPrice = this.applyVipPriceAdjustments(totalPrice);

    const updatedDiscountCosts = this.getFlatAdjustmentPrices(this.discounts);

    if (this.priceMatch)
      this.modifyTotalPriceBasedOnPrinceMatch(
        coverageCosts,
        surchargeCosts,
        updatedDiscountCosts
      );

    if (this.voucher) this.totalPrice -= this.voucher;
    if (this.totalPrice <= 0) this.totalPrice = 0;
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

  // A note about this feature. I initially didn't understand what the purpose/function of price match is. I sent a clarifying e-mail, and got an explanation.
  // I, however still wasn't 100% sure of what the exact functionality, in terms of a couple of details. Normally, in an employment position, I would of course
  // clarify and get more information, so that the implementation would be accure. But since this is just an assignment I didn't want to pester you guys
  // and waste too much of your time, so I ended up implementing my interpretation of it. The way I understood it is this:
  // When you enter a value into price match, the total price needs to equal the value entered into price match.
  // But the way to achieve this new value needs to be done so that every single price modifier needs to change also, so that the result equals price match.
  // I ended up also applying proportionate values, so percentage of total change to each of the modifiers, excluding voucher, which is applied at the end,
  // even if price match is set. Hopefulyl the interpretation is correct, as this thing actually ended up taking almost two full days,
  // so I ended up losing time for testing and refactoring (quite a few places in the application need it, including this method).
  // Also, the result is sometimes off by a couple of decimals. This is of course because of javascript's calculation inaccuracy.
  // Again, I ran out of time, so didnt manage to use a more accurate method.
  modifyTotalPriceBasedOnPrinceMatch(
    coverageCosts: number[],
    surchargeCosts: number[],
    discountCosts: number[]
  ) {
    const priceDifference = this.priceMatch - this.totalPrice;

    const totalPriceIncrease =
      this.basePrice + addArrayValues(coverageCosts) + addArrayValues(surchargeCosts);
    const totalPriceDecrease = addArrayValues(discountCosts);
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
      getPercentageOf(totalPriceIncrease, addArrayValues(surchargeCosts));

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
        addArrayValues(this.getFlatAdjustmentPrices(this.coverages)) +
        addArrayValues(this.getFlatAdjustmentPrices(this.surcharges)) -
        addArrayValues(this.getFlatAdjustmentPrices(this.discounts))
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
