import httpClient from "../client/http.client";
import { User } from "../models/users";
import { CoverageType } from "../types/index";

export async function getAllUsers() {
  try {
    const response = await httpClient.get(`/users/all`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addUser(data: User) {
  try {
    const response = await httpClient.post(`/users`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserByName(name: string) {
  try {
    const response = await httpClient.get(`/users/${name}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function changePriceAdjustmentSelectionStatus(
  name: string,
  data: CoverageType
) {
  try {
    const response = await httpClient.put(
      `/users/${name}/price-adjustment-selection`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
