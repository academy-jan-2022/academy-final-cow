import { render, screen } from "@testing-library/react";

import Template from "./Template";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services/infrastructure/StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<
  typeof storageHandler
>;
describe("page template should", () => {
  beforeEach(() => {
    render(
      <Template>
        <p>Child</p>
      </Template>
    );
  });

  test("renders its children", () => {
    const childElement = screen.getByText("Child");
    expect(childElement).toBeInTheDocument();
  });

  test("does not render the app bar at the top of the screen if not logged in", () => {
    const appBar = screen.queryAllByTestId("app-bar");
    expect(appBar.length).toBe(0);
  });

  describe("user is logged in", () => {
    test("render the app bar at the top of the screen if logged in", () => {
      mockedStorageHandler.getJSONItem = jest
        .fn()
        .mockReturnValueOnce({ token: "token" });
      render(
        <BrowserRouter>
          <Template>
            <p>Child</p>
          </Template>
        </BrowserRouter>
      );
      const appBar = screen.queryAllByTestId("app-bar");
      expect(appBar.length).toBe(1);
    });
  });
});
