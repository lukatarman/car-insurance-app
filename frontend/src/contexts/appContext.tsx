import { atom } from "recoil";
import { User } from "../models/users";

export const userDataState = atom({
  key: "userDataStateValue",
  default: new User(),
});
