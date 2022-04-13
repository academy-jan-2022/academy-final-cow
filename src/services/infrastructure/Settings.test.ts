
import appSettings from "../../appSettings.json"
import { Settings } from "./Settings";

describe("Settings should", ()=>{
    test("returns the api url stored in app settings", ()=>{
        const expectedUrl = appSettings.apiUrl;

        const result = Settings.getApiUrl()

        expect(result).toEqual(expectedUrl)
    })
})