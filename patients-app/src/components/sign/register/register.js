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
  SelectPicker,
  InputNumber,
} from "rsuite";

const SEXVALUES = ["Male", "Female"].map((s) => ({
  label: s,
  value: s,
}));
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
                    <Form.ControlLabel>Patient Name</Form.ControlLabel>
                    <div style={{ display: "flex" }}>
                      <Form.Control name="name" type="text" block />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Patient Age</Form.ControlLabel>
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
                        {/* <Button appearance="primary" onClick={ValidateOtp}>
                          Confirm Verification Code
                        </Button> */}
                      </div>
                    </Form.Group>
                  )}

                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.ControlLabel>Sex</Form.ControlLabel>
                  <SelectPicker
                    label="Sex"
                    value={formValue.sex}
                    onChange={(val) => onChange({ ...formValue, sex: val })}
                    block
                    data={SEXVALUES}
                    style={{ marginBottom: "30px" }}
                  />
                  <Form.Group>
                    <ButtonToolbar mt="20px">
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
