import React, { useCallback } from "react";
import { patientRegistrations, useAuth, useForm } from "../../../hooks";
import * as ls from "../../../services/local-storage";
import Login from "./login";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Schema } from "rsuite";

const initialFormValue = {
  phoneNo: "",
  password: "",
};
const { StringType } = Schema.Types;

const LoginPage = () => {
  const { organizationId } = useParams();
  console.log(organizationId, "organizationId");
  const { t } = useTranslation();
  const model = Schema.Model({
    phoneNo: StringType().isRequired(t("PHONE_NO_ERROR")),
    password: StringType().isRequired(t("PASSWORD_ERROR")),
  });
  const {
    formValue,
    setFormValue,
    checkResult,
    validate,
    show: showTwo,
    setShow: setShowTwo,
  } = useForm({
    initValue: initialFormValue,
    model,
  });
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
  const { login, loginLoading } = patientRegistrations({
    onLoginSucceeded,
    isAuthenticated,
  });

  const signIn = useCallback(() => {
    const { phoneNo, password } = formValue;
    const patientInput = {
      phoneNo: phoneNo,
      password: password,
      organizationId: organizationId,
    };
    login({
      variables: {
        input: patientInput,
      },
    });
  }, [formValue, login, organizationId]);
  return (
    <>
      <Login
        formValue={formValue}
        onChange={setFormValue}
        signIn={signIn}
        history={history}
        loginLoading={loginLoading}
        organizationId={organizationId}
        checkResult={checkResult}
        validate={validate}
        showTwo={showTwo}
        setShowTwo={setShowTwo}
      />
    </>
  );
};
export default LoginPage;
