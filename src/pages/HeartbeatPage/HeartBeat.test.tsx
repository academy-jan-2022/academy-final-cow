import React from "react";
import { act, render, screen } from "@testing-library/react";
import Heartbeat from "./Heartbeat";

const axios = require("axios");
jest.mock("axios");

interface HeartbeatResponse {
  status: string;
  components: {
    db: {
      status: string;
    };
  };
}

const apiCall = async (resCode: HeartbeatResponse) => {
  const resp = { data: resCode };
  axios.get.mockImplementation(() => Promise.resolve(resp));
  await act(async () => {
    render(<Heartbeat />);
  });
};

const UP_STATUS = "UP";
const DOWN_STATUS = "DOWN";

test("Show header", async () => {
  await apiCall({
    status: UP_STATUS,
    components: {
      db: {
        status: DOWN_STATUS,
      },
    },
  });
  const tickElement = screen.getByText("Health check");
  expect(tickElement).toBeInTheDocument();
});

test("Show green tick for backend status when status is up", async () => {
  await apiCall({
    status: UP_STATUS,
    components: {
      db: {
        status: DOWN_STATUS,
      },
    },
  });
  const tickElement = screen.getByRole("backendIsUp");
  expect(tickElement).toBeInTheDocument();
});

test("Show red tick for backend status when status is down", async () => {
  await apiCall({
    status: DOWN_STATUS,
    components: {
      db: {
        status: DOWN_STATUS,
      },
    },
  });
  const crossElement = screen.getByRole("backendIsDown");
  expect(crossElement).toBeInTheDocument();
});

test("Show green tick for backend and db when both backend and db status is up", async () => {
  await apiCall({
    status: UP_STATUS,
    components: {
      db: {
        status: UP_STATUS,
      },
    },
  });
  const dbCrossElement = screen.getByRole("databaseIsUp");
  expect(dbCrossElement).toBeInTheDocument();
});

test("Show red tick for db status when backend status is up but db status is down", async () => {
  await apiCall({
    status: UP_STATUS,
    components: {
      db: {
        status: DOWN_STATUS,
      },
    },
  });
  const dbCrossElement = screen.getByRole("databaseIsDown");
  expect(dbCrossElement).toBeInTheDocument();
});
