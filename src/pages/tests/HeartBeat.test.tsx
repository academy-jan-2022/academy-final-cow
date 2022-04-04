import React from "react";
import {act, render, screen} from "@testing-library/react";
import Heartbeat from "../Heartbeat";
const axios = require("axios")
import client from "../../Services/HttpClient";

jest.mock("axios");

test("Has health check header", () => {
    render(<Heartbeat />);
    const linkElement = screen.getByText(/Health check/i);
    expect(linkElement).toBeInTheDocument();
});

test("Show green tick when it receives a 200 code calling to Heartbeat test endpoint", async () => {
    axios.get.mockImplementation(() => Promise.resolve({status: 200}));
    await act(async () => {
        render(<Heartbeat />);
    });
    const tickElement = screen.getByRole("greenTick");
    expect(tickElement).toBeInTheDocument();
});