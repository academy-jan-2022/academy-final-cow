import React from "react";
import { act, render, screen } from "@testing-library/react";
import Heartbeat from "../Heartbeat";

const axios = require("axios");
jest.mock("axios");

interface HeartbeatResponse {
  status?: String;
  components?: {
    db: {
      status: String;
    }
  }
}

const apiCall = async (resCode: HeartbeatResponse) => {
  const resp = { data: resCode };
  axios.get.mockImplementation(() => Promise.resolve(resp));
  await act(async () => {
    render(<Heartbeat />);
  });
};

test("Show header", async () => {
  await apiCall({});
  const tickElement = screen.getByText("Health check");
  expect(tickElement).toBeInTheDocument();
});

test("Show green tick for backend status when status is up", async () => {
  await apiCall({
      status:"UP",
    });
  const tickElement = screen.getByRole("greenTick");
  expect(tickElement).toBeInTheDocument();
});

test("Show red tick for backend status when status is down", async () => {
  await apiCall({
    status:"DOWN",
  });
  const crossElement = screen.getByRole("redCross");
  expect(crossElement).toBeInTheDocument();
});

test("Show green tick for db status when both backend and db status is up", async () => {
  await apiCall({
    status: "UP",
    components: {
      db: {
        status: "UP"
      }
    }
  })
  const dbCrossElement = screen.getByRole("databaseGreenTick");
  expect(dbCrossElement).toBeInTheDocument();
})
