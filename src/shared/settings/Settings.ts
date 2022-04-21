import appSettings from "../../appSettings.json";

export class Settings {
  private static settings = appSettings;
  private static enviroment = process.env.NODE_ENV;

  public static getApiUrl() {
    return this.settings[Settings.enviroment].apiUrl

  }

  public static getGoogleClientId() {
    return this.settings[Settings.enviroment].googleClientId;
  }

  static getHeartBeatUrl() {
    return this.settings[Settings.enviroment].heartBeatUrl;
  }
}
