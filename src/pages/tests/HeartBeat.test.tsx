import React from "react";
import { act, render, screen } from "@testing-library/react";
import Heartbeat from "../Heartbeat";

const axios = require("axios");
jest.mock("axios");

const apiCall = async (resCode: String) => {
  const resp = { data: { status: resCode } };
  axios.get.mockImplementation(() => Promise.resolve(resp));
  await act(async () => {
    render(<Heartbeat />);
  });
};

test("Show header", async () => {
  await apiCall("UP");
  const tickElement = screen.getByText("Health check");
  expect(tickElement).toBeInTheDocument();
});

test("Show green tick when it receives a 200 code calling to Heartbeat test endpoint", async () => {
  await apiCall("UP");
  const tickElement = screen.getByRole("greenTick");
  expect(tickElement).toBeInTheDocument();
});

test("Show red tick when it receives a 200 code calling to Heartbeat test endpoint", async () => {
  await apiCall("DOWN");
  const crossElement = screen.getByRole("redCross");
  expect(crossElement).toBeInTheDocument();
});
