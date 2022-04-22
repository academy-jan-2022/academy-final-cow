import { render, screen } from "@testing-library/react";

import PageTemplate from "./PageTemplate";
import { storageHandler } from "../../infrastructure/StorageHandler";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../infrastructure/StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<
  typeof storageHandler
>;
describe("page template should", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PageTemplate>
          <p>Child</p>
        </PageTemplate>
      </BrowserRouter>
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
          <PageTemplate>
            <p>Child</p>
          </PageTemplate>
        </BrowserRouter>
      );
      const appBar = screen.queryAllByTestId("app-bar");
      expect(appBar.length).toBe(1);
    });
  });
});
