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

const Login = ({ formValue, onChange, signIn, history }) => {
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
              <a>ClinicR</a>
            </Navbar.Header>
          </Navbar>
        </Header>
        <Content style={{ marginTop: "100px" }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Login</h3>} bordered>
                <Form fluid formValue={formValue} onChange={onChange}>
                  <Form.Group>
                    <Form.ControlLabel>Phone Number</Form.ControlLabel>
                    <div style={{ display: "flex" }}>
                      <Form.Control
                        name="phoneNo"
                        type="text"
                        block
                      />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="off"
                      block
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={() => signIn()}>
                        Sign In
                      </Button>

                      {/* <Button appearance="link">Forgot password?</Button> */}
                      <Button
                        appearance="link"
                        onClick={() => {
                          history("/");
                        }}
                      >
                        Sign Up?
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
