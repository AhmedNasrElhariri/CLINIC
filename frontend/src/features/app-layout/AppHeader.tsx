import { Layout } from "antd";
import { User } from "features/users/interfaces";
import { memo, useState } from "react";
import { MdMenu } from "react-icons/md";
import AppDrawer from "./AppDrawer";
import BranchSelect from "./BranchSelect";
import Navigator from "./Navigator";
import SettingsDropdown from "./SettingsDropdown";
import UserAvatar from "./UserAvatar";

const { Header } = Layout;

export default memo(function AppHeader({
  onLogout,
  user,
}: {
  onLogout: Function;
  user: User;
}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header
        className="h-14 bg-gray-50 border-0 border-b border-slate-500/20 border-solid flex items-center justify-between gap-2
      px-2 sm:px-5"
      >
        <div className="flex items-center gap-3 sm:gap-10">
          <MdMenu
            className="antd-lg:hidden text-slate-600 cursor-pointer text-[27px]"
            onClick={() => setDrawerOpen(true)}
          />

          <Navigator />
        </div>
        <BranchSelect />
        <div
          className="flex items-center
gap-2 md:gap-4 lg:gap-7
text-2xl sm:text-3xl"
        >
          <UserAvatar user={user} />
          <SettingsDropdown logout={onLogout} />
        </div>
      </Header>
      <AppDrawer setOpen={setDrawerOpen} isOpen={isDrawerOpen} />
    </>
  );
});
