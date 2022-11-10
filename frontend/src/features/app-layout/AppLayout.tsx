import { Layout } from "antd";
import { User } from "features/users/interfaces";
import { memo, ReactElement } from "react";
import AppHeader from "./AppHeader";
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
    <Layout>
      <AppSider />
      <Layout>
        <AppHeader onLogout={onLogout} user={user} />
        <Content className="bg-white p-5">{children}</Content>
      </Layout>
    </Layout>
  );
});
