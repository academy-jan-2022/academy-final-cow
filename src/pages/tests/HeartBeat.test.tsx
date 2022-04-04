import React from "react";
import { act, render, screen } from "@testing-library/react";
import Heartbeat from "../Heartbeat";

const axios = require("axios");
jest.mock("axios");

test("Show green tick when it receives a 200 code calling to Heartbeat test endpoint", async () => {
  const resp = { data: { status: "200" } };
  axios.get.mockImplementation(() => Promise.resolve(resp));

  await act(async () => {
    render(<Heartbeat />);
  });
  const tickElement = screen.getByRole("greenTick");
  expect(tickElement).toBeInTheDocument();
});

test("Show green tick when it receives a 200 code calling to Heartbeat test endpoint", async () => {
  const resp = { data: { status: "500" } };
  axios.get.mockImplementation(() => Promise.resolve(resp));

  await act(async () => {
    render(<Heartbeat />);
  });
  const crossElement = screen.getByRole("redCross");
  expect(crossElement).toBeInTheDocument();
});
