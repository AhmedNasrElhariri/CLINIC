import React, { useCallback, useState, useEffect, useMemo } from "react";
import { app } from "../../services/firebase";
import { Message, toaster } from "rsuite";
import { patientRegistrations } from "../../hooks";
import { useTranslation } from "react-i18next";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import NewPassword from "./new-password";
import { useNavigate, useParams } from "react-router-dom";

const initialFormValue = {
  phoneNo: "",
  password: "",
  code: "",
};
const ForgetPassword = () => {
  const { organizationId } = useParams();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState(0);
  const { t } = useTranslation();
  const [final, setfinal] = useState("");
  const [confirm, setConfirm] = useState(false);
  const auth = getAuth(app);
  const { forgetPatientPassword, sendOtp } = patientRegistrations({
    setOtp,
    setShow,
    organizationId,
  });
  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        defaultCountry: "IN",
      },
      auth
    );
  };
  // const sendOtp = () => {
  //   const { phoneNo } = formValue;
  //   if (phoneNo === "" || phoneNo.length < 10) return;
  //   const newPhoneNo = "+2" + phoneNo;
  //   configureCaptcha();
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, newPhoneNo, appVerifier)
  //     .then((result) => {
  //       setfinal(result);
  //       toaster.push(
  //         <Message showIcon type="success" header="Success">
  //           Code Sent
  //         </Message>
  //       );
  //       setshow(true);
  //     })
  //     .catch((err) => {
  //       toaster.push(
  //         <Message showIcon type="error" header="Error">
  //           Code Unsent
  //         </Message>
  //       );
  //     });
  // };
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
  const changePassword = useCallback(() => {
    const { code, ...rest } = formValue;
    forgetPatientPassword({
      variables: {
        input: { ...rest },
      },
    });
  }, [formValue, forgetPatientPassword]);
  return (
    <>
      <NewPassword
        formValue={formValue}
        onChange={setFormValue}
        sendOtp={sendOtpProcess}
        show={show}
        confirm={confirm}
        changePatientPassword={changePassword}
      />
    </>
  );
};
export default ForgetPassword;
