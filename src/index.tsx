import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import SecondPage from "./pages/SecondPage";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("root") || new DocumentFragment();
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/second-page" element={<SecondPage />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
