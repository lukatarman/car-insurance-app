import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userDataState } from "../contexts/appContext";

const PriceInfo = () => {
  const userData = useRecoilValue(userDataState);

  const renderCoverages = () => {
    if (!userData.coverages) return;

    return userData.coverages.map((coverage, index) => {
      if (!coverage.isSelected) return;

      const percentageCostOf = coverage.percentageCost
        ? `(${coverage.percentageCost}% ${coverage.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between" key={index}>
          <div>
            {coverage.name} <span className="font-normal">{percentageCostOf}:</span>
          </div>
          <div className="font-normal">+{coverage.flatCost} EUR</div>
        </div>
      );
    });
  };

  const renderSurcharges = () => {
    if (!userData.surcharges) return;

    return userData.surcharges.map((surcharge, index) => {
      if (!surcharge.isSelected) return;

      const percentageCostOf = surcharge.percentageCost
        ? `(${surcharge.percentageCost}% ${surcharge.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between" key={index}>
          <div>
            {surcharge.name} <span className="font-normal">{percentageCostOf}:</span>
          </div>
          <div className="font-normal">+{surcharge.flatCost} EUR</div>
        </div>
      );
    });
  };

  const renderDiscounts = () => {
    if (!userData.discounts) return;

    return userData.discounts.map((discount, index) => {
      if (!discount.isSelected) return;

      const percentageCostOf = discount.percentageCost
        ? `(${discount.percentageCost}% ${discount.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between" key={index}>
          <div>
            {discount.name} <span className="font-normal">{percentageCostOf}:</span>
          </div>
          <div className="font-normal">-{discount.flatCost} EUR</div>
        </div>
      );
    });
  };

  const renderVoucher = () => {
    if (!userData.voucher) return;
    return (
      <div className="flex justify-between">
        <div>Voucher:</div>
        <div className="font-normal">-{userData.voucher} EUR</div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-200 w-1/2 xl:w-1/3 flex flex-col justify-between font-semibold text-sm">
      <div className="flex justify-between">
        <div>Base price:</div>
        <div className="font-normal">{userData.basePrice} EUR</div>
      </div>
      {renderCoverages()}
      {renderSurcharges()}
      {renderDiscounts()}
      {renderVoucher()}
      <div className="flex justify-between">
        <div>Total price:</div>
        <div className="font-normal">{userData.totalPrice} EUR</div>
      </div>
    </div>
  );
};

export default PriceInfo;
