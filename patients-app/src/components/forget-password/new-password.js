import React from "react";
import {
  Container,
  Content,
  Form,
  ButtonToolbar,
  Button,
  FlexboxGrid,
  Panel,
} from "rsuite";
import Header from "../shared-components/header";
import { useTranslation } from "react-i18next";
import { ComponentContainer } from "./style";

const NewPassword = ({
  formValue,
  onChange,
  sendOtp,
  show,
  confirm,
  changePatientPassword,
}) => {
  const { t } = useTranslation();
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Header />
        <ComponentContainer>
          <Panel header={<h3>{t("FORGET_PASSWORD_NAME")}</h3>} bordered>
            <Form fluid formValue={formValue} onChange={onChange}>
              <Form.Group>
                <Form.ControlLabel>{t("PHONENO")}</Form.ControlLabel>
                <div style={{ display: "flex" }}>
                  <Form.Control name="phoneNo" type="text" block />
                  {!confirm && (
                    <Button
                      appearance="primary"
                      onClick={sendOtp}
                      style={{ marginLeft: "10px" }}
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
                <Form.Group>
                  <Form.ControlLabel>{t("NEW_PASSWORD")}</Form.ControlLabel>
                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </Form.Group>
              )}

              <Form.Group>
                <ButtonToolbar>
                  {confirm && (
                    <Button
                      appearance="primary"
                      onClick={() => changePatientPassword()}
                    >
                      Ok
                    </Button>
                  )}
                </ButtonToolbar>
              </Form.Group>
            </Form>
          </Panel>
        </ComponentContainer>
        {/* <Footer>Footer</Footer> */}
      </Container>
    </div>
  );
};
export default NewPassword;
