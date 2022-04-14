import apiClient, {ROUTES} from "../infrastructure/ApiClient";

export type User = {
  externalId: string;
  fullName: string;
  idToken: string;
};

const createUser = (user: User) => {
  const { idToken, fullName, externalId } = user;

  return apiClient.post({
    route: ROUTES.CREATE_USER,
    body: { externalId, fullName },
    headers: { token: idToken },
  });
};

export default createUser;
