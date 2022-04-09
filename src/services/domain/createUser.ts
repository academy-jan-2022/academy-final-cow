import { HttpClient } from "../infrastructure/HttpClient";

type User = {
  externalId: string;
  fullName: string;
  idToken: string;
};

const createUser = (user: User) => {
  const client = new HttpClient();
  const { idToken, fullName, externalId } = user;
  console.log(user);

  return client.post({
    url: "http:localhost:8080/login",
    body: { externalId, fullName },
    headers: { token: idToken },
  });
};

export default createUser;
