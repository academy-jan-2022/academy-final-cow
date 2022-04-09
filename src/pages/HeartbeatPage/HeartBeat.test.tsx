import React from "react";
import { act, render, screen } from "@testing-library/react";
import HeartbeatPage from "./HeartbeatPage";

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
    render(<HeartbeatPage />);
  });
};

test("Show header", async () => {
  await apiCall({
    status: "UP",
    components: {
      db: {
        status: "DOWN",
      },
    },
  });
  const tickElement = screen.getByText("Health check");
  expect(tickElement).toBeInTheDocument();
});

test("Show green tick for backend status when status is up", async () => {
  await apiCall({
    status: "UP",
    components: {
      db: {
        status: "DOWN",
      },
    },
  });
  const tickElement = screen.getByRole("backendIsUp");
  expect(tickElement).toBeInTheDocument();
});

test("Show red tick for backend status when status is down", async () => {
  await apiCall({
    status: "DOWN",
    components: {
      db: {
        status: "DOWN",
      },
    },
  });
  const crossElement = screen.getByRole("backendIsDown");
  expect(crossElement).toBeInTheDocument();
});

test("Show green tick for backend and db when both backend and db status is up", async () => {
  await apiCall({
    status: "UP",
    components: {
      db: {
        status: "UP",
      },
    },
  });
  const dbCrossElement = screen.getByRole("databaseIsUp");
  expect(dbCrossElement).toBeInTheDocument();
});

test("Show red tick for db status when backend status is up but db status is down", async () => {
  await apiCall({
    status: "UP",
    components: {
      db: {
        status: "DOWN",
      },
    },
  });
  const dbCrossElement = screen.getByRole("databaseIsDown");
  expect(dbCrossElement).toBeInTheDocument();
});
