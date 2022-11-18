import { Drawer } from "antd";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import SideContent from "./SideContent";

export default memo(function AppDrawer({
  isOpen = false,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Drawer
      open={isOpen}
      width={256}
      onClose={closeDrawer}
      bodyStyle={{ padding: "0.5rem 0" }}
    >
      <SideContent closeDrawer={closeDrawer} />
    </Drawer>
  );
});
