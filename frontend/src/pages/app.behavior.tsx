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
import {
  addUser,
  getAllUsers,
  getUserByName,
  updateUser,
} from "../adapters/http.client.adapter";
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
    const getDbData = async () => {
      console.log(await getAllUsers());
    };

    getDbData();
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

    const response = await getUserByName(user.name);

    response ? await updateUser(user) : await addUser(user);

    getNewData();
  };

  const getNewData = async () => {
    const response: User = await getUserByName(nameInput);

    setUserData(User.oneFromBackend(response));
  };

  const handleIsSelectedChange = async () => {
    await getNewData();
  };

  return { handleFormSubmit, handleIsSelectedChange };
}

export default AppBehavior;
