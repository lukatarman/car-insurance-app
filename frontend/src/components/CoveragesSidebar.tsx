import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../contexts/appContext";
import { CoverageType } from "../types/index";
import { changePriceAdjustmentSelectionStatus } from "../adapters/http.client.adapter";
import { Coverage } from "../models/coverages";

type CoverageSidebarProps = {
  handleIsSelectedChange: () => Promise<void>;
};

const CoveragesSidebar: FC<CoverageSidebarProps> = ({ handleIsSelectedChange }) => {
  const [userData, setUserData] = useRecoilState(userDataState);

  const handleCheckboxChange = async (coverage: CoverageType) => {
    await changePriceAdjustmentSelectionStatus(userData.name, coverage);
    handleIsSelectedChange();
  };

  const renderCoverages = () => {
    if (!userData.coverages) return;

    return userData.coverages.map((coverage: Coverage, index: number) => {
      return (
        <div key={index}>
          <div
            onClick={() => {
              handleCheckboxChange(coverage);
            }}
            className="m-2 p-2"
          >
            <input type="checkbox" readOnly checked={coverage.isSelected}></input>
            <label>{coverage.name}</label>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-8 bg-gray-200 min-h-[140px] min-w-[240px]">
      <div>
        {!userData.coverages && (
          <span className="text-2xl font-semibold block mb-4">Coverages</span>
        )}
        <div className="m-2 flex flex-col flex-wrap">{renderCoverages()}</div>
      </div>
    </div>
  );
};

export default CoveragesSidebar;
