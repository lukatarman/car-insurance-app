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

export type UserFormInputType = {
  inputName: string;
  inputType: string;
  innerState: string | number | Date;
  setInnerState:
    | SetterOrUpdater<string>
    | SetterOrUpdater<Date>
    | SetterOrUpdater<number>;
};

const UserData = () => {
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

  return (
    <div className="p-8 flex flex-col justify-center grow basis-3/4">
      <h2 className="text-2xl font-semibold mb-4">User data</h2>
      <div>{formRender}</div>
      <div>
        <button
          className="py-1 px-4 m-2 bg-gray-200 border border-gray-300 rounded"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserData;
