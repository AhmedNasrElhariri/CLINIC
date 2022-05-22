import React, { useCallback } from "react";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button,
  FlexboxGrid,
  Panel,
  SelectPicker,
  InputNumber,
} from "rsuite";
import Header from "../../shared-components/header";
import { useTranslation } from "react-i18next";
import { ComponentContainer } from "./style";

const SEXVALUES = ["Male", "Female"].map((s) => ({
  label: s,
  value: s,
}));
const Register = ({
  formValue,
  onChange,
  sendOtp,
  show,
  confirm,
  signUp,
  history,
  registerLoading,
  organizationId,
  checkResult,
  validate,
  showTwo,
  setShowTwo,
}) => {
  const { t } = useTranslation();
  const onChangeValue = useCallback(
    (value) => {
      const val = Number(value);
      if (Number.isInteger(val)) {
        onChange({ ...formValue, age: val });
      }
    },
    [onChange, formValue]
  );
  return (
    <div className="show-fake-browser login-page">
      {/* <Container> */}
      <Header />
      <ComponentContainer>
        <Panel header={<h3>{t("SIGN_UP")}</h3>} bordered >
          <Form fluid formValue={formValue} onChange={onChange}>
            {confirm && (
              <>
                <Form.Group>
                  <Form.ControlLabel>{t("PATIENT_NAME")}</Form.ControlLabel>
                  <div style={{ display: "flex" }}>
                    <Form.Control
                      name="name"
                      type="text"
                      block
                      errorMessage={
                        showTwo ? checkResult["name"]?.errorMessage : ""
                      }
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>{t("PATIENT_AGE")}</Form.ControlLabel>
                  <div>
                    <InputNumber
                      label="Age"
                      value={formValue.age}
                      onChange={onChangeValue}
                      style={{ width: "100%" }}
                      block
                    />
                    {showTwo && checkResult["age"].hasError && (
                      <div className={"rs-form-control-wrapper"}>
                        <Form.ErrorMessage show={showTwo}>
                          {checkResult["age"].errorMessage}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </>
            )}
            <Form.Group>
              <Form.ControlLabel>{t("PHONENO")}</Form.ControlLabel>
              <div style={{ display: "flex" }}>
                <Form.Control
                  name="phoneNo"
                  type="text"
                  block
                  errorMessage={
                    showTwo ? checkResult["phoneNo"]?.errorMessage : ""
                  }
                />
                {!confirm && (
                  <Button
                    appearance="primary"
                    onClick={sendOtp}
                    style={{ margin: "0px 10px" }}
                  >
                    {t("NEXT")}
                  </Button>
                )}
              </div>
            </Form.Group>
            {show && (
              <Form.Group>
                <Form.ControlLabel>{t("CODE")}</Form.ControlLabel>
                <div style={{ display: "flex" }}>
                  <Form.Control name="code" type="text" block />
                </div>
              </Form.Group>
            )}
            {confirm && (
              <>
                <Form.Group>
                  <Form.ControlLabel>{t("PASSWORD")}</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                    errorMessage={
                      showTwo ? checkResult["password"]?.errorMessage : ""
                    }
                  />
                </Form.Group>
                <div style={{ marginBottom: "30px" }}>
                  <Form.ControlLabel>{t("SEX")}</Form.ControlLabel>
                  <SelectPicker
                    label="Sex"
                    value={formValue.sex}
                    onChange={(val) => onChange({ ...formValue, sex: val })}
                    block
                    data={SEXVALUES}
                  />
                  {showTwo && checkResult["sex"].hasError && (
                    <div className={"rs-form-control-wrapper"}>
                      <Form.ErrorMessage show={showTwo}>
                        {checkResult["sex"].errorMessage}
                      </Form.ErrorMessage>
                    </div>
                  )}
                </div>
              </>
            )}

            <Form.Group>
              <ButtonToolbar mt="20px">
                {confirm && (
                  <Button
                    appearance="primary"
                    onClick={() => {
                      setShowTwo(true);
                      validate && signUp();
                    }}
                    loading={registerLoading}
                  >
                    {t("SIGN_UP")}
                  </Button>
                )}
                {/* <Button appearance="link">Forgot password?</Button> */}
                <Button
                  appearance="link"
                  onClick={() => {
                    history(`/login/${organizationId}`);
                  }}
                >
                  {t("SIGN_IN_QESTION")}
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
      </ComponentContainer>
      {/* <Footer>Footer</Footer> */}
      {/* </Container> */}
    </div>
  );
};
export default Register;
