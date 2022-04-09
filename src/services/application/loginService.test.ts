import { loginService } from "./loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../domain/createUser";
import { storageHandler } from "../infrastructure/StorageHandler";

jest.mock("../domain/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

jest.mock("../infrastructure/StorageHandler");

const EXTERNAL_ID = "externalTestID";
const FULL_NAME = "Test Name";
const TOKEN = "token";

describe("googleLoginServiceShould", () => {
  const successfulResponse = {
    profileObj: {
      name: FULL_NAME,
      googleId: EXTERNAL_ID,
    },
    tokenObj: { id_token: TOKEN },
  } as GoogleLoginResponse;

  const unSuccessfulResponse = {} as GoogleLoginResponseOffline;
  test("should call createUser service when google login is successful", async () => {
    await loginService(successfulResponse);
    expect(mockedCreateUser).toHaveBeenCalledWith({
      externalId: EXTERNAL_ID,
      fullName: FULL_NAME,
      idToken: TOKEN,
    });
  });

  test("should not call createUser service when google login is unsuccessful", async () => {
    await loginService(unSuccessfulResponse);
    expect(mockedCreateUser).not.toHaveBeenCalled();
  });

  test("return '/teams' when login is successful", async () => {
    const returnValue = await loginService(successfulResponse);
    expect(returnValue).toEqual("/teams");
  });

  test("return '/error' when login is unsuccessful", async () => {
    const returnValue = await loginService(unSuccessfulResponse);
    expect(returnValue).toEqual("/error");
  });

  test("should set token object using storage handler", async () => {
    await loginService(successfulResponse);
    expect(storageHandler.setJSONItem).toHaveBeenCalled();
  });
});
