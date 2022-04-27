import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

//Useful for when we need to have access to query params or history
const renderWithMemoryRouter = (
  component: React.ReactElement,
  { pageUrl = "/", route = "/" }
) => {
  return render(
    <MemoryRouter initialEntries={[pageUrl]}>
      <Routes>
        <Route path={route} element={component} />
      </Routes>
    </MemoryRouter>
  );
};

export default renderWithMemoryRouter;
