import { Button, Dropdown } from "antd";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineBuild,
  MdOutlineGridView,
  MdOutlineMonetizationOn,
  MdOutlineTextSnippet,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";

import { Link } from "react-router-dom";
import { removeUserToken } from "services/local-storage";

const ROUTES = [
  {
    key: "configurations",
    icon: MdOutlineBuild,
    path: "/settings/configurations",
  },
  {
    key: "staticInfo",
    icon: MdOutlineGridView,
    path: "/settings/static",
  },

  {
    key: "payroll",
    icon: MdOutlineMonetizationOn,
    path: "/payroll",
  },

  {
    key: "snippets",
    icon: MdOutlineTextSnippet,
    path: "/snippets",
  },
];

export default memo(function SettingsDropdown({
  logout,
}: {
  logout: Function;
}) {
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    removeUserToken();
    logout();
  }, [logout]);

  return (
    <>
      <Dropdown
        trigger={["click"]}
        arrow
        className="flex items-center justify-center"
        menu={{
          items: [
            ...ROUTES.map((route) => ({
              ...route,
              icon: <route.icon className="text-lg" />,
              label: <Link to={route.path}>{t(route.key)}</Link>,
            })),
            {
              key: "logout",
              onClick: handleLogout,
              label: (
                <Link className="flex items-center gap-1" to="/login">
                  {t("logout")}
                </Link>
              ),
              icon: <MdOutlineLogout className="text-lg" />,
            },
          ],
        }}
      >
        <Button
          shape="circle"
          type="text"
          icon={<MdOutlineSettings className="text-2xl" />}
        />
      </Dropdown>
    </>
  );
});
