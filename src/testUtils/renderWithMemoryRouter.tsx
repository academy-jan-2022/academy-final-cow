import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PageRoutes } from "../pages/pageRoutes";

const renderWithMemoryRouter = (
  component: React.ReactElement,
  { pageUrl = PageRoutes.HOME, route = PageRoutes.HOME }
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
