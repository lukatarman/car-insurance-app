import httpClient from "../client/http.client";

export async function addUser(data: any) {
  const response = await httpClient.post(`/users`, data);
  console.log(`Response from server: ${response.data}`);
}
