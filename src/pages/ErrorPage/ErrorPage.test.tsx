import {render, screen} from "@testing-library/react";
import ErrorPage, {ERRORS} from "./ErrorPage";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Error page should", () => {
    test("render the heading", () => {
        render(<ErrorPage error={ERRORS.PAGE_NOT_FOUND}/>);
        const title = screen.getByRole("heading", {name: "title"});
        expect(title).toBeInTheDocument();
    });

    test("display page not found", () => {
        render(<ErrorPage error={ERRORS.PAGE_NOT_FOUND}/>);
        const text = screen.getByText("Page not found");
        expect(text).toBeInTheDocument();
    });

    test("display server error message", () => {
        render(<ErrorPage error={ERRORS.SERVER_ERROR}/>);
        const text = screen.getByText("Something went wrong");
        expect(text).toBeInTheDocument();
    });

    test("display unauthorised", () => {
        render(<ErrorPage error={ERRORS.UNAUTHORISED}/>);
        const text = screen.getByText("Unauthorised");
        expect(text).toBeInTheDocument();
    });

    test("display return to homepage button", () => {
        render(<ErrorPage error={ERRORS.UNAUTHORISED}/>);
        const btn = screen.getByText("Return to homepage");
        expect(btn).toBeInTheDocument();
    });

    test("return to homepage when the button is clicked", () => {
        render(<ErrorPage error={ERRORS.UNAUTHORISED}/>);
        const btn = screen.getByText("Return to homepage");
        expect(btn).toBeInTheDocument();
        btn.click();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
});
