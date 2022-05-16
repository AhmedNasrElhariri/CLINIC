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
      <Container>
        <Header />
        <Content style={{ marginTop: "100px" }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>{t("SIGN_UP")}</h3>} bordered>
                <Form fluid formValue={formValue} onChange={onChange}>
                  {confirm && (
                    <>
                      <Form.Group>
                        <Form.ControlLabel>
                          {t("PATIENT_NAME")}
                        </Form.ControlLabel>
                        <div style={{ display: "flex" }}>
                          <Form.Control name="name" type="text" block />
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.ControlLabel>
                          {t("PATIENT_AGE")}
                        </Form.ControlLabel>
                        <div style={{ display: "flex" }}>
                          <InputNumber
                            label="Age"
                            value={formValue.age}
                            onChange={onChangeValue}
                            block
                            style={{ marginBottom: "10px", width: "100%" }}
                          />
                        </div>
                      </Form.Group>
                    </>
                  )}
                  <Form.Group>
                    <Form.ControlLabel>{t("PHONENO")}</Form.ControlLabel>
                    <div style={{ display: "flex" }}>
                      <Form.Control name="phoneNo" type="text" block />
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
                        {/* <Button appearance="primary" onClick={ValidateOtp}>
                          Confirm Verification Code
                        </Button> */}
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
                        />
                      </Form.Group>
                      <Form.ControlLabel>{t("SEX")}</Form.ControlLabel>
                      <SelectPicker
                        label="Sex"
                        value={formValue.sex}
                        onChange={(val) => onChange({ ...formValue, sex: val })}
                        block
                        data={SEXVALUES}
                        style={{ marginBottom: "30px" }}
                      />
                    </>
                  )}

                  <Form.Group>
                    <ButtonToolbar mt="20px">
                      {confirm && (
                        <Button
                          appearance="primary"
                          onClick={() => signUp()}
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
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Container>
    </div>
  );
};
export default Register;
