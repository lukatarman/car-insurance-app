import React, { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataState } from "../contexts/appContext";
import { CoverageType, Discount } from "../types/index";
import { changeDiscountSelectionStatus } from "../adapters/http.client.adapter";

type DiscountsHeaderProps = {
  handleIsSelectedChange: () => Promise<void>;
};

const DiscountsHeader: FC<DiscountsHeaderProps> = ({ handleIsSelectedChange }) => {
  const [userData, setUserData] = useRecoilState(userDataState);

  const handleCheckboxChange = async (discount: Discount, index: number) => {
    await changeDiscountSelectionStatus(userData.name, discount);
    handleIsSelectedChange();
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const renderDiscounts = () => {
    if (!userData.discounts) return;

    return userData.discounts.map((discount, index) => (
      <div key={index} className="m-2 p-2">
        <input
          type="checkbox"
          checked={discount.isSelected}
          onChange={() => {
            handleCheckboxChange(discount, index);
          }}
        ></input>
        <label>{discount.name}</label>
      </div>
    ));
  };

  return (
    <div className="p-8 bg-gray-200 min-h-[140px] flex flex-col justify-center">
      <div className="m-2 flex flex-row justify-between">
        <div className="m-2 flex flex-row">{renderDiscounts()}</div>
        <div className="m-2 flex">
          <div className="m-2 p-2">total price</div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsHeader;
