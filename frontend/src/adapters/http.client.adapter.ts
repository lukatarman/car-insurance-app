import httpClient from "../client/http.client";
import { User } from "../models/users.js";

export async function addUser(data: User) {
  const response = await httpClient.post(`/users`, data);
  console.log(`Response from server: ${response.data}`);
}
