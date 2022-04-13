
import appSettings from "../../appSettings.json"
import { Settings } from "./Settings";

describe("Settings should", ()=>{
    test("returns the api url stored in app settings", ()=>{
        const expectedUrl = appSettings.apiUrl;

        const result = Settings.getApiUrl()

        expect(result).toEqual(expectedUrl)
    })

    test("returns the google client id stored in app settings", ()=>{
        const expectedUrl = appSettings.googleClientId;

        const result = Settings.getGoogleClientId()

        expect(result).toEqual(expectedUrl)
    })
})