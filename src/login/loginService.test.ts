import { loginService } from "./loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../user/createUser";
import { storageHandler } from "../shared/infrastructure/StorageHandler";

jest.mock("../user/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

jest.mock("../shared/storageHandler/StorageHandler");

const EXTERNAL_ID = "externalTestID";
const FULL_NAME = "Test Name";
const TOKEN = "token";

describe("login service should", () => {
  describe("on unsuccessful response", () => {
    const unSuccessfulResponse = {} as GoogleLoginResponseOffline;

    test("should not call createUser service", async () => {
      await loginService(unSuccessfulResponse);
      expect(mockedCreateUser).not.toHaveBeenCalled();
    });

    test("return '/error' route string", async () => {
      const returnValue = await loginService(unSuccessfulResponse);
      expect(returnValue).toEqual("/error");
    });
  });

  describe("on successful response", () => {
    const successfulResponse = {
      profileObj: {
        name: FULL_NAME,
        googleId: EXTERNAL_ID,
      },
      tokenObj: { id_token: TOKEN },
    } as GoogleLoginResponse;

    test("should call createUser service", async () => {
      await loginService(successfulResponse);
      expect(mockedCreateUser).toHaveBeenCalledWith({
        externalId: EXTERNAL_ID,
        fullName: FULL_NAME,
        idToken: TOKEN,
      });
    });

    test("return '/teams' route string", async () => {
      const returnValue = await loginService(successfulResponse);
      expect(returnValue).toEqual("/teams");
    });

    test("should set token object using storage handler", async () => {
      await loginService(successfulResponse);
      expect(storageHandler.setJSONItem).toHaveBeenCalled();
    });
  });
});
