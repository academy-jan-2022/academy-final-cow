import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./AppBar";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  render(
    <BrowserRouter>
      <AppBar />
    </BrowserRouter>
  );
});

test("renders avatar", () => {
  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
});

test("renders logo", () => {
  const logo = screen.getByTestId("logo");
  expect(logo).toBeInTheDocument();
});

test("see logout button when you click avatar", () => {
  const avatar = screen.getByTestId("avatar");
  avatar.click();
  const logoutButton = screen.getByText("Logout");
  expect(logoutButton).toBeInTheDocument();
});
