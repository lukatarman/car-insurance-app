import React, { Fragment } from "react";

const UserFormInput = ({ formValues }: { formValues: any }) => {
  const formRender = formValues.map(
    ({ inputName, inputType }: { inputName: any; inputType: any }) => {
      const label = inputName[0].toUpperCase() + inputName.slice(1);

      const hasEur = inputName === "voucher" || inputName === "price match";

      return (
        <div className="flex m-1 w-100">
          <div className="flex flex-col justify-center min-w-[120px]">
            <label htmlFor={inputName} className="block w-100">
              {label}:
            </label>
          </div>
          <div className="flex flex-row justify-center align-center rounded-md w-[200px]">
            <input
              type={inputType}
              name={inputName}
              id={inputName}
              className="p-1 border-2 border-black-500 rounded-md w-full"
            />
            {hasEur && <div className="flex flex-col justify-center px-1">EUR</div>}
          </div>
        </div>
      );
    }
  );

  return <div className="flex flex-col">{formRender}</div>;
};

export default UserFormInput;
