import { Layout } from "antd";
import { User } from "common/interfaces";
import { memo, ReactElement } from "react";
import AppHeader from "./app-header/AppHeader";
import AppSider from "./AppSider";

const { Content } = Layout;

export default memo(function AppLayout({
  children,
  onLogout,
  user,
}: {
  children: ReactElement;
  onLogout: Function;
  user: User;
  visbleAppointment: boolean;
  visblePatient: boolean;
  toggleAppointment: Function;
  togglePatient: Function;
}) {
  return (
    <Layout hasSider>
      <AppSider />
      <Layout className="ltr:antd-lg:ml-[200px] rtl:antd-lg:mr-[200px]">
        <AppHeader onLogout={onLogout} user={user} />
        <Content className="bg-white p-5">{children}</Content>
      </Layout>
    </Layout>
  );
});
