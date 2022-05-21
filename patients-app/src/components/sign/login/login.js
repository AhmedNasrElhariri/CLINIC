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
import { useTranslation } from "react-i18next";
import Header from "../../shared-components/header";

const Login = ({
  formValue,
  onChange,
  signIn,
  history,
  organizationId,
  loginLoading,
  checkResult,
  validate,
  showTwo,
  setShowTwo,
}) => {
  const { t } = useTranslation();
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Header />
        <Content style={{ marginTop: "100px" }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={t("LOGIN")} bordered>
                <Form fluid formValue={formValue} onChange={onChange}>
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
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel>{t("PASSWORD")}</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="off"
                      block
                      errorMessage={
                        showTwo ? checkResult["password"]?.errorMessage : ""
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button
                        appearance="primary"
                        onClick={() => {
                          setShowTwo(true);
                          validate && signIn();
                        }}
                        loading={loginLoading}
                      >
                        {t("SIGN_IN")}
                      </Button>

                      {/* <Button appearance="link">Forgot password?</Button> */}
                      <Button
                        appearance="link"
                        onClick={() => {
                          history(`/register/${organizationId}`);
                        }}
                      >
                        {t("SIGN_UP")}
                      </Button>
                      <Button
                        appearance="link"
                        onClick={() => {
                          history("/forget-password");
                        }}
                      >
                        {t("FORGET_PASSWORD")}
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
export default Login;
