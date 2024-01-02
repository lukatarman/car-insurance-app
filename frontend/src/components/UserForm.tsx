import { useEffect } from "react";
import UserFormInput from "./UserFormInput";
import {
  userInputBirthdateValueState,
  userInputCityValueState,
  userInputNameValueState,
  userInputPriceMatchValueState,
  userInputVPowerValueState,
  userInputVoucherValueState,
} from "../contexts/userFormInputContext";
import { SetterOrUpdater, useRecoilState } from "recoil";

type formData = {
  name: string;
  birthdate: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
};

export type UserFormInputType = {
  inputName: string;
  inputType: string;
  innerState: string | number | Date;
  setInnerState:
    | SetterOrUpdater<string>
    | SetterOrUpdater<Date>
    | SetterOrUpdater<number>;
};

const UserForm = () => {
  const [nameInput, setNameInput] = useRecoilState(userInputNameValueState);
  const [birthdateInput, setBirthdateInput] = useRecoilState(
    userInputBirthdateValueState
  );
  const [cityInput, setCityInput] = useRecoilState(userInputCityValueState);
  const [vehiclePowerInput, setVehiclePowerInput] = useRecoilState(
    userInputVPowerValueState
  );
  const [voucherInput, setVoucherInput] = useRecoilState(userInputVoucherValueState);
  const [priceMatchInput, setPriceMatchInput] = useRecoilState(
    userInputPriceMatchValueState
  );

  const formValues: UserFormInputType[] = [
    {
      inputName: "name",
      inputType: "text",
      innerState: nameInput,
      setInnerState: setNameInput,
    },
    {
      inputName: "birthdate",
      inputType: "date",
      innerState: birthdateInput,
      setInnerState: setBirthdateInput,
    },
    {
      inputName: "city",
      inputType: "text",
      innerState: cityInput,
      setInnerState: setCityInput,
    },
    {
      inputName: "vehicle power",
      inputType: "number",
      innerState: vehiclePowerInput,
      setInnerState: setVehiclePowerInput,
    },
    {
      inputName: "voucher",
      inputType: "number",
      innerState: voucherInput,
      setInnerState: setVoucherInput,
    },
    {
      inputName: "price match",
      inputType: "number",
      innerState: priceMatchInput,
      setInnerState: setPriceMatchInput,
    },
  ];

  const formRender = formValues.map((formValue: UserFormInputType, index) => (
    <UserFormInput key={index} formValue={formValue} />
  ));

  const testFunc = (e: any) => {
    e.preventDefault();

    const formData: formData = {
      name: nameInput,
      birthdate: birthdateInput,
      city: cityInput,
      vehiclePower: vehiclePowerInput,
      voucher: voucherInput,
      priceMatch: priceMatchInput,
    };

    console.log("submitted");
    console.log(formData);
  };

  return (
    <div className="p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4">User data</h2>
      <form onSubmit={testFunc}>
        <div>{formRender}</div>
        <div>
          <button
            className="py-1 px-4 m-2 bg-gray-200 border border-gray-400 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
