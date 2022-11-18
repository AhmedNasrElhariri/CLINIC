import { Layout } from "antd";
import { memo } from "react";
import SideContent from "./SideContent";

const { Sider } = Layout;

export default memo(function AppSider() {
  return (
    <Sider
      className="h-screen border-0 border-r border-solid border-slate-300/50 fixed left-0 top-0 bottom-0"
      theme="light"
      breakpoint="lg"
      trigger={null}
      collapsedWidth="0"
    >
      <div className="pt-10">
        <SideContent />
      </div>
    </Sider>
  );
});
