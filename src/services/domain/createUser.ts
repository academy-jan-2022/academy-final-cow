import apiClient, { API_ENDPOINT } from "../infrastructure/ApiClient";

export type User = {
  externalId: string;
  fullName: string;
  idToken: string;
};

const createUser = (user: User) => {
  const { fullName, externalId } = user;

  return apiClient.post({
    route: API_ENDPOINT.CREATE_USER,
    body: { externalId, fullName },
  });
};

export default createUser;
