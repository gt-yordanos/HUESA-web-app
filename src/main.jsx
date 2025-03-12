import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import { AssociationsProvider } from "./contexts/AssociationsContext";
import { AuthProvider } from './contexts/AuthContext';
import App from "./App";
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <AssociationsProvider>
          <App />
          <ToastContainer />
        </AssociationsProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);