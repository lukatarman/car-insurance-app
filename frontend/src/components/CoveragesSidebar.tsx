import React from "react";

const CoveragesSidebar = () => {
  const testArr = [1, 2, 3, 4];

  const testContentRender = testArr.map((content, index) => (
    <div key={index} className="m-2 p-2">
      test content
    </div>
  ));

  return (
    <div className="p-8 bg-gray-200 min-h-[140px] ">
      <div>
        <span className="text-2xl font-semibold block mb-4">Coverages</span>
        <div className="m-2 flex flex-col flex-wrap">{testContentRender}</div>
      </div>
    </div>
  );
};

export default CoveragesSidebar;
