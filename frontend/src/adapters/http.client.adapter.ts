import httpClient from "../client/http.client";
import { User } from "../models/users";
import { CoverageType } from "../types/index";

export async function getAllUsers(): Promise<[]> {
  const response = await httpClient.get(`/users/all`);
  return response.data;
}

export async function getUserByName(name: string): Promise<User | null> {
  const response = await httpClient.get(`/users/${name}`);
  return response.data;
}

export async function addUser(data: User): Promise<void> {
  const response = await httpClient.post(`/users`, data);
  return response.data;
}

export async function updateUser(user: User): Promise<void> {
  const response = await httpClient.put(`/users/${user.name}/update`, user);
  return response.data;
}

export async function changePriceAdjustmentSelectionStatus(
  name: string,
  data: CoverageType
): Promise<void> {
  const response = await httpClient.put(
    `/users/${name}/price-adjustment-selection`,
    data
  );
  return response.data;
}
