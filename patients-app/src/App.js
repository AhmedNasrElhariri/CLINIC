import React, { useMemo } from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import Login from "./components/sign/login";
import CreateAppointment from "./components/appointment/create-appointment";
import Register from "./components/sign/register";
import ForgetPassword from "./components/forget-password";
import RefTCreateComponent from "./components/ref-toCreateAppointment";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useAuth } from "./hooks";
import LangSelector from "./components/lang/langSelector";
import { useTranslation } from "react-i18next";
import { LangContext } from "./services/context";

function App() {
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const dir = useMemo(() => {
    const { language } = i18n;
    if (language === "ar") {
      return "rtl";
    } else {
      return "ltr";
    }
  }, [i18n.language]);

  return (
    <>
      <BrowserRouter>
        <div style={{ direction: dir }}>
          <LangContext.Provider value={dir}>
            <LangSelector />
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route
                    path="/create-appointment/:organizationId"
                    element={<CreateAppointment />}
                  />
                  <Route
                    path="/login/:organizationId"
                    element={<RefTCreateComponent />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/register/:organizationId"
                    element={<Register />}
                  />
                  <Route path="/login/:organizationId" element={<Login />} />
                  <Route
                    path="/forget-password/:organizationId"
                    element={<ForgetPassword />}
                  />
                </>
              )}
            </Routes>
          </LangContext.Provider>
        </div>
      </BrowserRouter>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default App;
