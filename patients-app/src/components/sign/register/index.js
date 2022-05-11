import React, { useCallback, useState, useEffect, useMemo } from "react";
import { app } from "../../../services/firebase";
import { Message, toaster } from "rsuite";
import { patientRegistrations } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import Register from "./register";

const initialFormValue = {
  phoneNo: "",
  name: "",
  age: 0,
  sex: "",
  password: "",
  code: "",
};
const RegisterPage = () => {
  const { organizationId } = useParams();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [confirm, setConfirm] = useState(false);
  const auth = getAuth(app);
  const history = useNavigate();
  const { register } = patientRegistrations({});
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
  const sendOtp = () => {
    const { phoneNo } = formValue;
    if (phoneNo === "" || phoneNo.length < 10) return;
    const newPhoneNo = "+2" + phoneNo;
    configureCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, newPhoneNo, appVerifier)
      .then((result) => {
        setfinal(result);
        toaster.push(<Message showIcon type="success" header="Success">Code Sent</Message>);
        setshow(true);
      })
      .catch((err) => {
        toaster.push(<Message showIcon type="error" header="Error">Code Unsent</Message>);
      });
  };
  const codeLength = useMemo(() => {
    const { code } = formValue;
    return code.length;
  }, [formValue.code]);
  useEffect(() => {
    if (codeLength === 6) {
      const { code } = formValue;
      if (code === null || final === null) return;
      final
        .confirm(code)
        .then((result) => {
          toaster.push(<Message showIcon type="success" header="Success">Success</Message>);
          setConfirm(true);
          setshow(false);
        })
        .catch((err) => {
          toaster.push(<Message showIcon type="error" header="Error">Fail</Message>);
        });
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
        sendOtp={sendOtp}
        // ValidateOtp={ValidateOtp}
        show={show}
        confirm={confirm}
        signUp={signUp}
        history={history}
      />
    </>
  );
};
export default RegisterPage;
