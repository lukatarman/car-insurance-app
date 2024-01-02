import { atom } from "recoil";

export const userInputNameValueState = atom({
  key: "UserInputNameValue",
  default: "",
});

export const userInputBirthdateValueState = atom({
  key: "UserInputBirthdateValue",
  default: new Date(),
});

export const userInputCityValueState = atom({
  key: "UserInputCityValue",
  default: "",
});

export const userInputVPowerValueState = atom({
  key: "UserInputVPowerValue",
  default: 0,
});

export const userInputVoucherValueState = atom({
  key: "UserInputVoucherValue",
  default: 0,
});

export const userInputPriceMatchValueState = atom({
  key: "UserInputPriceMatchValue",
  default: 0,
});

export const formDataValuesState = atom({
  key: "FormDataValues",
  default: "",
});
