import { Drawer } from "antd";
import { Dispatch, memo, SetStateAction } from "react";
import SideContent from "./SideContent";

export default memo(function AppDrawer({
  isOpen = false,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Drawer
      open={isOpen}
      width={256}
      onClose={() => setOpen(false)}
      bodyStyle={{ padding: "0.5rem 0"}}
    >
      <SideContent />
    </Drawer>
  );
});
