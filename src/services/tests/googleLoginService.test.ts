import {googleLoginService} from "../googleLoginService";
import {GoogleLoginResponse} from "react-google-login";

describe("googleLoginServiceShould", ()=>{
    test("return '/teams' when login is successful", ()=>{

        const successfulResponse = {
            profileObj: {
                name: "testProfile"
            }
        } as GoogleLoginResponse

        const returnValue = googleLoginService(successfulResponse);
        expect(returnValue).toEqual('/teams');
    })
})