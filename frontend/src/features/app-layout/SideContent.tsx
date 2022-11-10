import { memo, useContext, useMemo } from "react";
import { Can } from "components/user/can";
import {
  BellOutlined,
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  InboxOutlined,
  DollarOutlined,
  IdcardOutlined,
  SolutionOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { List } from "antd";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalsContext } from "common/contexts/ModalsContext";

export default memo(function SideContent() {
  const { t } = useTranslation();
  const { toggleAddAppointment, toggleAddPatient } = useContext(ModalsContext);

  const ROUTES = useMemo(
    () => [
      {
        path: "/appointments/today",
        name: "todayAppointments",
        icon: BellOutlined,
      },
      {
        path: "/appointments",
        name: "appointments",
        extra: (
          <Can I="Create" an="Appointment">
            <div className="w-8 flex items-center justify-end">
              <MdAddCircleOutline
                onClick={toggleAddAppointment}
                className="text-[1.25rem] cursor-pointer text-slate-700"
              />
            </div>
          </Can>
        ),
        icon: CalendarOutlined,
      },
      {
        path: "/patients",
        name: "patients",
        extra: (
          <Can I="Create" an="Patient">
            <div className="w-8 flex items-center justify-end">
              <MdAddCircleOutline
                onClick={toggleAddPatient}
                className="text-[1.25rem] cursor-pointer text-slate-700"
              />
            </div>
          </Can>
        ),
        icon: UserOutlined,
      },

      {
        path: "/reports",
        name: "reports",
        icon: FileTextOutlined,
      },

      {
        path: "/surgeries",
        name: "surgeries",
        icon: MedicineBoxOutlined,
      },
      {
        path: "/report-printouts",
        name: "reportsPrintout",
        icon: PrinterOutlined,
      },
      {
        path: "/courses",
        name: "courses",
        icon: SolutionOutlined,
      },
      {
        path: "/supplier-account",
        name: "supplierAccount",
        icon: IdcardOutlined,
      },
      {
        path: "/sales",
        name: "sales",
        icon: DollarOutlined,
      },
      {
        path: "/inventory",
        name: "inventory",
        icon: InboxOutlined,
      },
    ],
    []
  );

  return (
    <List
      className="mt-10"
      dataSource={ROUTES}
      renderItem={(route) => (
        <List.Item className="text-xs py-0 px-4 h-10 flex items-center justify-between">
          <Link
            to={route.path}
            className="flex items-center text-xs gap-2 h-full grow"
          >
            <route.icon className="!text-[18px]" /> {t(route.name)}
          </Link>
          {route.extra}
        </List.Item>
      )}
    />
  );
});
