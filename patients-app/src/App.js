import React, { useState } from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import Login from "./components/sign/login";
import CreateAppointment from "./components/appointment/create-appointment";
import Register from "./components/sign/register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useHistory,
} from "react-router-dom";
import { useAuth } from "./hooks";
import * as ls from "./services/local-storage";

function App() {
  const { isAuthenticated } = useAuth();
  const token = ls.getToken();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/create-appointment/:organizationId"
                element={<CreateAppointment />}
              />
              <Route path="" element={<CreateAppointment />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="" element={<Register />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default App;
