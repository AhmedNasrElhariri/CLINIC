import React, { useMemo, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Message, toaster } from "rsuite";
import { REGISTER, LOGIN } from "../apollo-client/queries";
import { useNavigate } from "react-router-dom";
import * as ls from "../services/local-storage";
import { useAuth } from "./index";
import { ACCESS_TOKEN } from "../services/local-storage";

const PatientRegistrations = ({ onLoginSucceeded, isAuthenticated }) => {
  const history = useNavigate();
  const { setAuthenticated } = useAuth({});
  const [register] = useMutation(REGISTER, {
    onCompleted() {
      toaster.push(
        <Message showIcon type="success" header="Success">
          The user has been Registered Successfully
        </Message>
      );
      history("/login");
    },
    // update(cache, { data: { registerPatient: patient } }) {},
    onError(err) {
      toaster.push(
        <Message showIcon type="error" header="Error">
          {err.message}
        </Message>
      );
    },
  });
  const [login] = useMutation(LOGIN, {
    onCompleted({ loginPatient: { token, organizationId } }) {
      toaster.push(
        <Message showIcon type="success" header="Success">
          Your Logged Successfully'
        </Message>
      );
      onLoginSucceeded({ token });
      history(`/create-appointment/${organizationId}`);
    },
    // update(cache, { data: { loginPatient: patient } }) {},
    onError(err) {
      toaster.push(
        <Message showIcon type="error" header="Error">
          {err.message}
        </Message>
      );
    },
  });
  const logout = useCallback(() => {
    ls.removeUserToken(ACCESS_TOKEN);
    setAuthenticated(false);
    history("/login");
    window.location.reload();
  }, [setAuthenticated]);

  return useMemo(
    () => ({ register, login, logout }),
    [register, login, logout]
  );
};

export default PatientRegistrations;
