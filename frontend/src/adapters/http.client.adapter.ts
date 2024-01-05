import httpClient from "../client/http.client";
import { User } from "../models/users";
import { CoverageType } from "../types/index";

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

export async function changeCoverageStatus(name: string, data: CoverageType) {
  try {
    const response = await httpClient.put(`/users/${name}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function changeDiscountSelectionStatus(
  name: string,
  coverageName: CoverageType
) {
  try {
    await httpClient.put(`/users/${name}/discounts`, coverageName);
  } catch (err) {
    console.log(err);
  }
}
