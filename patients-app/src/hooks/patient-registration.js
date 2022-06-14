import React, { useMemo, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { Message, toaster } from "rsuite";
import {
  REGISTER,
  LOGIN,
  FORGET_PATIENT_PASSWORD,
} from "../apollo-client/queries";
import { useNavigate } from "react-router-dom";
import * as ls from "../services/local-storage";
import { useAuth } from "./index";
import { ACCESS_TOKEN } from "../services/local-storage";
import { useTranslation } from "react-i18next";

const PatientRegistrations = ({ onLoginSucceeded, organizationId }) => {
  const history = useNavigate();
  const { t } = useTranslation();
  const { setAuthenticated } = useAuth({});
  const [register, { loading: registerLoading }] = useMutation(REGISTER, {
    onCompleted() {
      toaster.push(
        <Message showIcon type="success" header="Success">
          {t("REGISTER_MESSAGE")}
        </Message>
      );
      history(`/login/${organizationId}`);
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
  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    onCompleted({ loginPatient: { token, organizationId: ORGID, patientId } }) {
      toaster.push(
        <Message showIcon type="success" header="Success">
          {t("LOGIN_MESSAGE")}
        </Message>
      );
      onLoginSucceeded({ token, patientId });
      history(`/create-appointment/${ORGID}`);
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
  const [forgetPatientPassword, { loading: forgetPasswordLoading }] =
    useMutation(FORGET_PATIENT_PASSWORD, {
      onCompleted() {
        toaster.push(
          <Message showIcon type="success" header="Success">
            {t("CHANGE_PASSWORD_MESSAGE")}
          </Message>
        );
        history(`/login/${organizationId}`);
      },
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
    history(`/login/${organizationId}`);
    window.location.reload();
  }, [setAuthenticated]);

  return useMemo(
    () => ({
      register,
      login,
      logout,
      forgetPatientPassword,
      registerLoading,
      loginLoading,
      forgetPasswordLoading,
    }),
    [
      register,
      login,
      logout,
      forgetPatientPassword,
      registerLoading,
      loginLoading,
      forgetPasswordLoading,
    ]
  );
};

export default PatientRegistrations;
