import React from "react";
import { render, screen } from "@testing-library/react";
import Heartbeat from "../Heartbeat";

test("Has health check header", () => {
    render(<Heartbeat />);
    const linkElement = screen.getByText(/Health check/i);
    expect(linkElement).toBeInTheDocument();
});
