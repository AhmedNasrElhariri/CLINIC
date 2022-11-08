import { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { LoginPayload } from "features/auth/interfaces";
import { useLoginMutation } from "features/auth/authAPI";

const subTitleClasses =
  "!text-lg lg:!text-5xl !font-normal uppercase font-bebasNeue";

export default function Login({
  onLoginSucceeded,
  onLoginFailed,
}: {
  onLoginSucceeded: Function;
  onLoginFailed: Function;
}) {
  const [loginMutation, { data, isSuccess, isLoading, isError }] =
    useLoginMutation();

  const onFinish = useCallback(
    (values: LoginPayload) => {
      loginMutation(values);
    },
    [loginMutation]
  );

  useEffect(() => {
    if (isError) onLoginFailed();
  }, [isError, onLoginFailed]);

  useEffect(() => {
    if (isSuccess) {
      onLoginSucceeded(data);
    }
  }, [isSuccess, data, onLoginSucceeded]);

  return (
    <div className="h-screen w-full flex">
      <div className="mt-10 items-center grow inline-flex flex-col">
        <div
          className="max-w-md w-full px-5 flex flex-col justify-center
        items-center lg:items-start"
        >
          <div className="lg:my-10 text-center">
            <img src="logo.png" alt="logo" width="auto" />
          </div>
          <div
            className="flex text-lg gap-2 
          mt-6 lg:mt-0 lg:mb-3
          items-center lg:items-start
          lg:flex-col"
          >
            <h2 className={`${subTitleClasses} !text-primary`}>Appointments</h2>
            <span className="lg:hidden">-</span>
            <h2 className={subTitleClasses}>Reports</h2>
            <span className="lg:hidden">-</span>
            <h2 className={subTitleClasses}>Agenda</h2>
          </div>
          <Form
            onFinish={onFinish}
            className="w-full mt-3"
            disabled={isLoading}
          >
            <Form.Item name="email">
              <Input placeholder="Enter Email" />
            </Form.Item>
            <Form.Item name="password" className="mb-3">
              <Input.Password placeholder="Enter Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        className="grow-[2] lg:grow-[1.375] tw-hidden md:block"
        style={{
          backgroundImage: "url('images/login.png')",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
