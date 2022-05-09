import React, { useCallback, useState } from "react";
import { patientRegistrations, useAuth } from "../../../hooks";
import * as ls from "../../../services/local-storage";
import Login from "./login";
import { useNavigate } from "react-router-dom";

const initialFormValue = {
  phoneNo: "",
  password: "",
};
const LoginPage = () => {
  const [formValue, setFormValue] = useState(initialFormValue);
  const { isAuthenticated, setAuthenticated } = useAuth();
  const history = useNavigate();
  const onLoginSucceeded = useCallback(
    ({ token, patientId }) => {
      ls.setUserToken(token);
      ls.setPatientId(patientId);
      setAuthenticated(true);
    },
    [setAuthenticated]
  );
  const { login } = patientRegistrations({ onLoginSucceeded, isAuthenticated });

  const signIn = useCallback(() => {
    const { phoneNo, password } = formValue;
    const patientInput = { phoneNo: phoneNo, password: password };
    login({
      variables: {
        input: patientInput,
      },
    });
  }, [formValue, login]);
  return (
    <>
      <Login
        formValue={formValue}
        onChange={setFormValue}
        signIn={signIn}
        history={history}
      />
    </>
  );
};
export default LoginPage;
