import appSettings from "../../appSettings.json"

export class Settings {
    private static settings = appSettings

    public static getApiUrl(){
        return this.settings.apiUrl
    }

    public static getGoogleClientId(){
        return this.settings.googleClientId;
    }
}