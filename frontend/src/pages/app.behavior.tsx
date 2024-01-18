import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import { formErrorState, userDataState } from "../contexts/appContext";
import { FormEvent, useEffect } from "react";
import { UserDTO } from "../models/user.dto.js";

function AppBehavior() {
  const nameInput = useRecoilValue(userInputNameValueState);
  const birthdateInput = useRecoilValue(userInputBirthdateValueState);
  const cityInput = useRecoilValue(userInputCityValueState);
  const vehiclePowerInput = useRecoilValue(userInputVPowerValueState);
  const voucherInput = useRecoilValue(userInputVoucherValueState);
  const priceMatchInput = useRecoilValue(userInputPriceMatchValueState);
  const setFormError = useSetRecoilState(formErrorState);

  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const getDbData = async () => {
      console.log(await getAllUsers());
    };

    getDbData();
  }, [userData]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formIsMissingRequiredValues()) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const currentUserData = {
      nameInput,
      birthdateInput,
      cityInput,
      vehiclePowerInput,
      voucherInput,
      priceMatchInput,
    };

    const response = await getUserByName(nameInput);

    if (response) await updateExistingUser(response, currentUserData);

    if (!response) await addNewUser(currentUserData);

    await getNewData();
  };

  const formIsMissingRequiredValues = () => {
    return (
      nameInput === "" ||
      birthdateInput === "" ||
      cityInput === "" ||
      vehiclePowerInput === ""
    );
  };

  const updateExistingUser = async (response: User, userData: UserDTO) => {
    const user = User.oneFromBackend(response);

    user.updateFormValues(userData);

    await updateUser(user);
  };

  const addNewUser = async (userData: UserDTO) => {
    const user = User.oneFromRawData(userData);

    await addUser(user);
  };

  const getNewData = async () => {
    const response = await getUserByName(nameInput);

    if (!response) return;

    setUserData(User.oneFromBackend(response));
  };

  const handleIsSelectedChange = async () => {
    await getNewData();
  };

  return { handleFormSubmit, handleIsSelectedChange };
}

export default AppBehavior;
