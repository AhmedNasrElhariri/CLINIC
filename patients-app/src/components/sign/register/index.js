import React, { useCallback, useState, useEffect, useMemo } from "react";
import { app } from "../../../services/firebase";
import { Message, toaster, Schema } from "rsuite";
import { patientRegistrations, useForm } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import Register from "./register";
import { useTranslation } from "react-i18next";

const initialFormValue = {
  phoneNo: "",
  name: "",
  age: 0,
  sex: "",
  password: "",
  code: "",
};
const { StringType, NumberType } = Schema.Types;

const RegisterPage = ({}) => {
  const { organizationId } = useParams();
  const [otp, setOtp] = useState(0);
  const { t } = useTranslation();
  const model = Schema.Model({
    phoneNo: StringType().isRequired(t("PHONE_NO_ERROR")),
    name: StringType().isRequired(t("NAME_ERROR")),
    age: NumberType().range(1, 100, t("AGE_ERROR")),
    sex: StringType().isRequired(t("SEX_ERROR")),
    password: StringType().isRequired(t("PASSWORD_ERROR")),
  });
  const [show, setShow] = useState(false);
  const [final, setfinal] = useState("");
  const [confirm, setConfirm] = useState(false);
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

  const auth = getAuth(app);
  const history = useNavigate();
  const { register, registerLoading, sendOtp } = patientRegistrations({
    organizationId,
    setOtp,
    setShow,
  });
  
  const sendOtpProcess = useCallback(() => {
    const { phoneNo } = formValue;
    if (phoneNo === "" || phoneNo.length < 10) return;
    const newPhoneNo = "2" + phoneNo;
    sendOtp({ variables: { phoneNo: newPhoneNo } });
  }, [sendOtp, formValue]);


  const codeLength = useMemo(() => {
    const { code } = formValue;
    return code.length;
  }, [formValue.code]);
  useEffect(() => {
    if (codeLength === 6) {
      const { code } = formValue;
      if (code === null || otp === 0) return;
      if (code == otp) {
        toaster.push(
          <Message showIcon type="success" header="Success">
            {t("PHONE_NO_VERIFY_MESSAGE")}
          </Message>
        );
        setConfirm(true);
        setShow(false);
      } else {
        toaster.push(
          <Message showIcon type="error" header="Error">
            {t("FAIL")}
          </Message>
        );
      }
    }
  }, [codeLength]);
  const signUp = useCallback(() => {
    const { code, ...rest } = formValue;
    register({
      variables: {
        input: { ...rest, organizationId: organizationId },
      },
    });
  }, [formValue, register]);
  return (
    <>
      <Register
        formValue={formValue}
        onChange={setFormValue}
        sendOtp={sendOtpProcess}
        show={show}
        confirm={confirm}
        signUp={signUp}
        history={history}
        registerLoading={registerLoading}
        organizationId={organizationId}
        checkResult={checkResult}
        validate={validate}
        showTwo={showTwo}
        setShowTwo={setShowTwo}
      />
    </>
  );
};
export default RegisterPage;
