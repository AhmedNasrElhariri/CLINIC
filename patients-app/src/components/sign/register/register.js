import React from "react";
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
const patientTypes = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];
const Register = ({
  formValue,
  onChange,
  sendOtp,
  ValidateOtp,
  show,
  confirm,
  signUp,
  history,
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
              <Panel header={<h3>Register</h3>} bordered>
                <Form fluid formValue={formValue} onChange={onChange}>
                  <Form.Group>
                    <Form.ControlLabel>Phone Number</Form.ControlLabel>
                    <div style={{ display: "flex" }}>
                      <Form.Control
                        name="phoneNo"
                        type="text"
                        style={{ width: "300px" }}
                      />
                      
                        <Button
                          appearance="primary"
                          style={{ width: "200px" }}
                          onClick={sendOtp}
                        >
                          Get Verification Code
                        </Button>
                      
                    </div>
                  </Form.Group>
                  {show && (
                    <Form.Group>
                      <Form.ControlLabel>Code</Form.ControlLabel>
                      <div style={{ display: "flex" }}>
                        <Form.Control
                          name="code"
                          type="text"
                          style={{ width: "300px" }}
                        />
                        <Button
                          appearance="primary"
                          style={{ width: "200px" }}
                          onClick={ValidateOtp}
                        >
                          Confirm Verification Code
                        </Button>
                      </div>
                    </Form.Group>
                  )}

                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="off"
                      style={{ width: "300px" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      {confirm && (
                        <Button appearance="primary" onClick={() => signUp()}>
                          Sign Up
                        </Button>
                      )}
                      {/* <Button appearance="link">Forgot password?</Button> */}
                      <Button
                        appearance="link"
                        onClick={() => {
                          history("/login");
                        }}
                      >
                        Sign In?
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
