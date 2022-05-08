import React, { useCallback, useState } from "react";
import { app } from "../../../services/firebase";
import { Message, toaster } from "rsuite";
import { patientRegistrations } from "../../../hooks";
import { useNavigate } from 'react-router-dom';
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
  type: "",
  password: "",
  code: "",
};
const RegisterPage = () => {
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
        callback: (response) => {
        },
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
        toaster.push(<Message>Code Sent</Message>);
        setshow(true);
      })
      .catch((err) => {
        toaster.push(<Message>Code Unsent</Message>);
      });
  };
  const ValidateOtp = () => {
    const { code } = formValue;
    if (code === null || final === null) return;
    final
      .confirm(code)
      .then((result) => {
        toaster.push(<Message>Success</Message>);
        setConfirm(true);
        setshow(false);
      })
      .catch((err) => {
        toaster.push(<Message>Fail</Message>);
      });
  };
  const signUp = useCallback(() => {
    const { phoneNo, password } = formValue;
    const patientInput = { phoneNo: phoneNo, password: password };
    register({
      variables: {
        input: patientInput,
      },
    });
  }, [formValue, register]);
  return (
    <>
      <Register
        formValue={formValue}
        onChange={setFormValue}
        sendOtp={sendOtp}
        ValidateOtp={ValidateOtp}
        show={show}
        confirm={confirm}
        signUp={signUp}
        history={history}
      />
    </>
  );
};
export default RegisterPage;
