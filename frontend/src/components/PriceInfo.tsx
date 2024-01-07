import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../contexts/appContext";

const PriceInfo = () => {
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const renderCoverages = () => {
    if (!userData.coverages) return;

    return userData.coverages.map((coverage) => {
      if (!coverage.isSelected) return;

      const percentageCostOf = coverage.percentageCost
        ? `(${coverage.percentageCost}% ${coverage.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between">
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

    return userData.surcharges.map((surcharge) => {
      if (!surcharge.isSelected) return;

      const percentageCostOf = surcharge.percentageCost
        ? `(${surcharge.percentageCost}% ${surcharge.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between">
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

    return userData.discounts.map((discount) => {
      if (!discount.isSelected) return;

      const percentageCostOf = discount.percentageCost
        ? `(${discount.percentageCost}% ${discount.percentageCostOf})`
        : "";

      return (
        <div className="flex justify-between">
          <div>
            {discount.name} <span className="font-normal">{percentageCostOf}:</span>
          </div>
          <div className="font-normal">-{discount.flatCost} EUR</div>
        </div>
      );
    });
  };

  return (
    <div className="p-8 bg-gray-200 w-1/2  lg:w-1/4 flex flex-col justify-between font-semibold text-sm">
      <div className="flex justify-between">
        <div>Base price:</div>
        <div className="font-normal">{userData.basePrice} EUR</div>
      </div>
      {renderCoverages()}
      {renderSurcharges()}
      {renderDiscounts()}
      <div className="flex justify-between">
        <div>Total price:</div>
        <div className="font-normal">{userData.totalPrice} EUR</div>
      </div>
    </div>
  );
};

export default PriceInfo;
