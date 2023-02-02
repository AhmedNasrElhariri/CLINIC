import { memo, useContext, useMemo, MouseEventHandler } from 'react';
import { Can } from 'components/user/can';
import {
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  InboxOutlined,
  DollarOutlined,
  IdcardOutlined,
  SolutionOutlined,
  PrinterOutlined,
  HistoryOutlined,
  PoundOutlined,
} from '@ant-design/icons';
import { List } from 'antd';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalsContext } from 'common/contexts/ModalsContext';
import ListItem from './list-router-item';

export default memo(function SideContent({
  closeDrawer,
}: {
  closeDrawer?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { t } = useTranslation();
  const { toggleAddAppointment, toggleAddPatient } = useContext(ModalsContext);

  const ROUTES = useMemo(
    () => [
      {
        path: '/appointments/today',
        name: 'todayAppointments',
        icon: CalendarOutlined,
      },
      {
        path: '/appointments',
        name: 'appointments',
        extra: (
          <Can I="Create" an="Appointment">
            <div className="w-8 flex items-center justify-end">
              <MdAddCircleOutline
                onClick={toggleAddAppointment}
                className="text-[1.25rem] cursor-pointer text-slate-600"
              />
            </div>
          </Can>
        ),
        icon: CalendarOutlined,
      },
      {
        path: '/patients',
        name: 'patients',
        extra: (
          <Can I="Create" an="Patient">
            <div className="w-8 flex items-center justify-end">
              <MdAddCircleOutline
                onClick={toggleAddPatient}
                className="text-[1.25rem] cursor-pointer text-slate-600"
              />
            </div>
          </Can>
        ),
        icon: UserOutlined,
      },

      {
        path: '/reports',
        name: 'reports',
        icon: FileTextOutlined,
      },

      {
        path: '/surgeries',
        name: 'surgeries',
        icon: MedicineBoxOutlined,
      },
      {
        path: '/report-printouts',
        name: 'reportsPrintout',
        icon: PrinterOutlined,
      },
      {
        path: '/courses',
        name: 'Courses',
        icon: SolutionOutlined,
      },
      {
        path: '/supplier-account',
        name: 'supplierAccount',
        icon: IdcardOutlined,
      },
      {
        path: '/sales',
        name: 'sales',
        icon: DollarOutlined,
      },
      {
        path: '/inventory',
        name: 'inventory',
        icon: InboxOutlined,
      },

      {
        path: '/logging',
        name: 'logging',
        icon: HistoryOutlined,
      },
      {
        path: '/doctors',
        name: 'Doctors',
        icon: PoundOutlined,
      },
    ],
    [toggleAddAppointment, toggleAddPatient]
  );

  return (
    <List
      dataSource={ROUTES}
      renderItem={route =>
        route.name === 'logging' ? (
          <Can I="View" an="Logging">
            <ListItem closeDrawer={closeDrawer} route={route} t={t} />
          </Can>
        ) : route.name === 'Doctors' ? (
          <Can I="View" an="DoctorFees">
            <ListItem closeDrawer={closeDrawer} route={route} t={t} />
          </Can>
        ) : route.name === 'Courses' ? (
          <Can I="View" an="Courses">
            <ListItem closeDrawer={closeDrawer} route={route} t={t} />
          </Can>
        ) : (
          <List.Item className="text-xs py-0 px-4 h-10 flex items-center justify-between">
            <Link
              onClick={closeDrawer}
              to={route.path}
              className="flex items-center text-xs gap-2 h-full grow text-slate-600"
            >
              <route.icon className="!text-[18px]" /> {t(route.name)}
            </Link>
            {route.extra}
          </List.Item>
        )
      }
    />
  );
});
