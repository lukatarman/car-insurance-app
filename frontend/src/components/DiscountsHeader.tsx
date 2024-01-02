import React from "react";

const DiscountsHeader = () => {
  const testArr = [1, 2, 3, 4];

  const testContentRender = testArr.map((content, index) => (
    <div key={index} className="m-2 p-2">
      test content
    </div>
  ));

  return (
    <div className="p-8 bg-gray-200 min-h-[140px] flex flex-col justify-center">
      <div className="m-2 flex flex-row justify-between">
        <div className="m-2 flex flex-row">{testContentRender}</div>
        <div className="m-2 flex">
          <div className="m-2 p-2">total price</div>
        </div>
      </div>
    </div>
  );
};

export default DiscountsHeader;
