type User = {
  externalId: string;
  fullName: string;
};

import { HttpClient } from "../HttpClient";

const createUser = (user: User) => {
  const client = new HttpClient();

  client.post({url: "https://www.teaminator-backend.azurewebsites.net/create-user", body: user});
};

export default createUser;