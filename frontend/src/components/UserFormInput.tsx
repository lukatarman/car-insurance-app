import React from "react";
import { UserFormInputType } from "./UserData";

const UserFormInput: React.FC<{ formValue: UserFormInputType; key: number }> = (
  { formValue },
  key
) => {
  const { inputName, inputType } = formValue;

  const label = inputName[0].toUpperCase() + inputName.slice(1);

  const hasEur = inputName === "voucher" || inputName === "price match";

  const getValue = () => {
    if (formValue.innerState instanceof Date) return "";
    return formValue.innerState;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) formValue.setInnerState(e.target.value);
  };

  return (
    <div key={key} className="flex flex-col">
      <div className="flex m-1 w-100">
        <div className="flex flex-col justify-center min-w-[120px]">
          <label htmlFor={inputName} className="block w-100">
            {label}:
          </label>
        </div>
        <div className="flex flex-row justify-center align-center rounded-md w-[200px]">
          <input
            onChange={handleInputChange}
            type={inputType}
            value={getValue()}
            name={inputName}
            id={inputName}
            className="p-1 border-2 border-black-500 rounded-md w-full"
          />
          {hasEur && <div className="flex flex-col justify-center px-1 mr-2">EUR</div>}
        </div>
      </div>
    </div>
  );
};

export default UserFormInput;
