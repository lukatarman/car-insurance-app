import { useRecoilState, useRecoilValue } from "recoil";
import {
  userInputBirthdateValueState,
  userInputCityValueState,
  userInputNameValueState,
  userInputPriceMatchValueState,
  userInputVPowerValueState,
  userInputVoucherValueState,
} from "../contexts/userFormInputContext";
import { User } from "../models/users";
import { addUser, getUserByName } from "../adapters/http.client.adapter";
import { userDataState } from "../contexts/appContext";
import { FormEvent, useEffect } from "react";

function AppBehavior() {
  const nameInput = useRecoilValue(userInputNameValueState);
  const birthdateInput = useRecoilValue(userInputBirthdateValueState);
  const cityInput = useRecoilValue(userInputCityValueState);
  const vehiclePowerInput = useRecoilValue(userInputVPowerValueState);
  const voucherInput = useRecoilValue(userInputVoucherValueState);
  const priceMatchInput = useRecoilValue(userInputPriceMatchValueState);

  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    console.log("new data");
    console.log(userData);
  }, [userData]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userObj = {
      nameInput,
      birthdateInput,
      cityInput,
      vehiclePowerInput,
      voucherInput,
      priceMatchInput,
    };

    const user = User.oneFromRawData(userObj);

    await addUser(user);

    getNewData();
  };

  const getNewData = async () => {
    const response: User = await getUserByName(nameInput);

    console.log("response is:");
    console.log(response);

    setUserData(User.oneFromBackend(response));
  };

  const handleIsSelectedChange = async () => {
    await getNewData();
  };

  return { handleFormSubmit, handleIsSelectedChange };
}

export default AppBehavior;
