import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import App from "./App";

// Render the app wrapped in the BrowserRouter and ThemeProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
