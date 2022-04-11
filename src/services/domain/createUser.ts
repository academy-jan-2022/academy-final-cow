import { HttpClient } from "../infrastructure/HttpClient";

export type User = {
  externalId: string;
  fullName: string;
  idToken: string;
};

const createUser = (user: User) => {
  const client = new HttpClient();
  const { idToken, fullName, externalId } = user;

  return client.post({
    url: process.env.REACT_APP_BASE_URL + "/login",
    body: { externalId, fullName },
    headers: { token: idToken },
  });
};

export default createUser;
