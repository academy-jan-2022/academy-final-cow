import { render, screen } from "@testing-library/react";

import PageTemplate from "../PageTemplate";
import { storageHandler } from "../../services/StorageHandler";

jest.mock("../../services/StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<
  typeof storageHandler
>;
describe("page template should", () => {
  beforeEach(() => {
    render(
      <PageTemplate>
        <p>Child</p>
      </PageTemplate>
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
        <PageTemplate>
          <p>Child</p>
        </PageTemplate>
      );

      const appBar = screen.queryAllByTestId("app-bar");
      expect(appBar.length).toBe(1);
    });
  });
});
