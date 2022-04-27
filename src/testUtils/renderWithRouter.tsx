import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const renderWithMemoryRouter = (
  component: React.ReactElement,
  { pageUrl = "/", route = "/" }
): RenderResult => {
  return render(
    <MemoryRouter initialEntries={[pageUrl]}>
      <Routes>
        <Route path={route} element={component} />
      </Routes>
    </MemoryRouter>
  );
};

export default renderWithMemoryRouter;
