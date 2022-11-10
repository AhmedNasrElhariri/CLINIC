import { Layout } from "antd";
import { memo } from "react";
import SideContent from "./SideContent";

const { Sider } = Layout;

export default memo(function AppSider() {
  return (
    <Sider
      className="h-screen border-0 border-r border-solid border-slate-300/50"
      theme="light"
      breakpoint="lg"
      trigger={null}
      collapsedWidth="0"
    >
      <SideContent />
    </Sider>
  );
});
