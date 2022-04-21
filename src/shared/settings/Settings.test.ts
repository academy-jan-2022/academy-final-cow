import appSettings from "../../appSettings.json";
import { Settings } from "./Settings";

describe("Settings should", () => {
  test("returns the api url stored in app settings", () => {
    const expectedUrl = appSettings.test.apiUrl;

    const result = Settings.getApiUrl();

    expect(result).toEqual(expectedUrl);
  });

  test("returns the google client id stored in app settings", () => {
    const expectedUrl = appSettings.test.googleClientId;

    const result = Settings.getGoogleClientId();

    expect(result).toEqual(expectedUrl);
  });

  test("returns the heartbeat url stored in app settings", () => {
    const expectedUrl = appSettings.test.heartBeatUrl;

    const result = Settings.getHeartBeatUrl();

    expect(result).toEqual(expectedUrl);
  });
});
