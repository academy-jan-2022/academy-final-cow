type User = {
  externalId: string;
  fullName: string;
};

import { HttpClient } from "../HttpClient";

const createUser = (user: User) => {
  const client = new HttpClient();

  return client.post({
    url: process.env.REACT_APP_BASE_URL + "/create-user",
    body: user,
  });
};

export default createUser;
