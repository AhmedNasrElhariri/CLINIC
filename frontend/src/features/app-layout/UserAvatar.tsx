import { Avatar } from "antd";
import { User } from "features/users/interfaces";
import { memo } from "react";
import { MdPersonOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default memo(function UserAvatar({ user }: { user: User }) {
  return (
    <Link to="/me" className="flex items-center text-slate-700">
      <div className="sm:inline-flex items-center text-sm cursor-pointer gap-2 tw-hidden">
        {user?.name}
        <Avatar size="large" src={user.avatar} shape="circle" />
      </div>
      <MdPersonOutline className="sm:hidden" />
    </Link>
  );
});
