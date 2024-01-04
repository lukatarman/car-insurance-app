import { useRecoilValue } from "recoil";
import {
  userInputBirthdateValueState,
  userInputCityValueState,
  userInputNameValueState,
  userInputPriceMatchValueState,
  userInputVPowerValueState,
  userInputVoucherValueState,
} from "../contexts/userFormInputContext";
import { User } from "../models/users";

function AppBehavior() {
  const nameInput = useRecoilValue(userInputNameValueState);
  const birthdateInput = useRecoilValue(userInputBirthdateValueState);
  const cityInput = useRecoilValue(userInputCityValueState);
  const vehiclePowerInput = useRecoilValue(userInputVPowerValueState);
  const voucherInput = useRecoilValue(userInputVoucherValueState);
  const priceMatchInput = useRecoilValue(userInputPriceMatchValueState);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const userObj = {
      name: nameInput,
      birthday: birthdateInput,
      city: cityInput,
      vehiclePower: vehiclePowerInput,
      voucher: voucherInput,
      priceMatch: priceMatchInput,
    };

    const user = new User(userObj);

    console.log(user);
  };

  return handleFormSubmit;
}

export default AppBehavior;
