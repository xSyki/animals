import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";

import "./styles/generatedCss/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
