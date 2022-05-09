import React, { useCallback } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  ButtonToolbar,
  Button,
  Navbar,
  FlexboxGrid,
  Panel,
} from "rsuite";

const NewPassword = ({
  formValue,
  onChange,
  sendOtp,
  show,
  confirm,
  changePatientPassword,
}) => {
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Header>
          <Navbar
            appearance="inverse"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              fontSize: "25px",
            }}
          >
            <Navbar.Header>
              <a className="navbar-brand logo">ClinicR</a>
            </Navbar.Header>
          </Navbar>
        </Header>
        <Content style={{ marginTop: "100px" }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Forget Password</h3>} bordered>
                <Form fluid formValue={formValue} onChange={onChange}>
                  <Form.Group>
                    <Form.ControlLabel>Phone Number</Form.ControlLabel>
                    <div style={{ display: "flex" }}>
                      <Form.Control name="phoneNo" type="text" block />
                      {!confirm && (
                        <Button
                          appearance="primary"
                          onClick={sendOtp}
                          style={{ marginLeft: "10px" }}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </Form.Group>
                  {show && (
                    <Form.Group>
                      <Form.ControlLabel>Code</Form.ControlLabel>
                      <div style={{ display: "flex" }}>
                        <Form.Control name="code" type="text" block />
                      </div>
                    </Form.Group>
                  )}
                  {confirm && (
                    <Form.Group>
                      <Form.ControlLabel>New Password</Form.ControlLabel>
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
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Container>
    </div>
  );
};
export default NewPassword;
