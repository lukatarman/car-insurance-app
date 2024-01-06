import React, { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../contexts/appContext";
import { CoverageType, Discount, Surcharge, SurchargeNames } from "../types/index";
import { changePriceAdjustmentSelectionStatus } from "../adapters/http.client.adapter";

type DiscountsHeaderProps = {
  handleIsSelectedChange: () => Promise<void>;
};

const DiscountsHeader: FC<DiscountsHeaderProps> = ({ handleIsSelectedChange }) => {
  const [userData, setUserData] = useRecoilState(userDataState);

  const handleCheckboxChange = async (discount: CoverageType) => {
    await changePriceAdjustmentSelectionStatus(userData.name, discount);
    handleIsSelectedChange();
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const renderAdjustments = (adjustments: Discount[] | Surcharge[] | undefined) => {
    if (!adjustments) return;

    return adjustments.map((adjustment: Discount | Surcharge, index: number) => {
      return (
        <div key={index}>
          {adjustment.isShown && (
            <div
              onClick={() => {
                if (adjustment.name === SurchargeNames.strongCar) return;
                handleCheckboxChange(adjustment);
              }}
              className="m-2 p-2"
            >
              <input type="checkbox" readOnly checked={adjustment.isSelected}></input>
              <label>{adjustment.name}</label>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-8 bg-gray-200 min-h-[140px] flex flex-col justify-center">
      <div className="m-2 flex flex-row justify-between">
        <div className="m-2 flex flex-row">
          {renderAdjustments(userData.discounts)}
          {renderAdjustments(userData.surcharges)}
        </div>
        <div className="m-2 flex">
          <div className="m-2 p-2">{userData.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsHeader;
