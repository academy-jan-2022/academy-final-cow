import { loginService } from "./loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../user/createUser";
import { storageHandler } from "../shared/infrastructure/StorageHandler";

jest.mock("../user/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

jest.mock("../shared/infrastructure/StorageHandler");

const EXTERNAL_ID = "externalTestID";
const FULL_NAME = "Test Name";
const TOKEN = "token";

describe("login service should", () => {
    const tokenObject = {externalId: EXTERNAL_ID,
    provider: "google",
    fullName: FULL_NAME,
    idToken: TOKEN}

    test("should call createUser service", async () => {
      await loginService(tokenObject);
      expect(mockedCreateUser).toHaveBeenCalledWith({
        externalId: EXTERNAL_ID,
        fullName: FULL_NAME,
        idToken: TOKEN,
      });
    });

    test("return true if log in successful", async () => {
      const returnValue = await loginService(tokenObject);
      expect(returnValue).toEqual(true);
    });

    test("should set token object using storage handler", async () => {
      await loginService(tokenObject);
      expect(storageHandler.setJSONItem).toHaveBeenCalled();
    });
});
