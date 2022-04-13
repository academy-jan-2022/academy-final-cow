import { HttpClient } from "../infrastructure/HttpClient";
import { Settings } from "../infrastructure/Settings";

type User = {
  externalId: string;
  fullName: string;
  idToken: string;
};

const createUser = (user: User) => {
  const client = new HttpClient();
  const { idToken, fullName, externalId } = user;

  return client.post({
    url: Settings.getApiUrl() + "/login",
    body: { externalId, fullName },
    headers: { token: idToken },
  });
};

export default createUser;
