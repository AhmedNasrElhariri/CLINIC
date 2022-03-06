import React, { useRef, useEffect } from 'react';

import { Whisper, Popover, Form } from 'rsuite';
import { NavStyled, BadgeStyled } from './style';
import { Div } from 'components';
import { set, get } from 'services/local-storage';
import { NotificationIcon, SettingsIcon } from 'components/icons/index';
import Notifications from 'components/functional/notifications';
import Settings from 'components/functional/settings';
import Avatar from './avatar';
import Navigator from './navigator';
import { CRSelectInput } from 'components/widgets';
import { useNewAppointment } from 'hooks';
import { i18n } from '../../../translations/i18n';
const languages = [
  { id: 'ar', name: 'اللغه العربيه' },
  { id: 'en', name: 'English' },
];
const NotificatinBadge = ({ count }) => (
  <Div position="relative">
    {!!count && (
      <BadgeStyled>
        <span>{count}</span>
      </BadgeStyled>
    )}
    <NotificationIcon />
  </Div>
);
NotificatinBadge.defaultProps = {
  alert: false,
};

const Navbar = ({
  onLogout,
  onClickAvatar,
  avatar,
  notifications,
  onClear,
  formValue,
  setFormValue,
  user,
}) => {
  const notificationsRef = useRef();
  const settingsRef = useRef();
  const { organizationBranches } = useNewAppointment({});

  useEffect(() => {
    setFormValue(val => ({
      ...val,
      branchId: get('branch'),
    }));
  }, []);
  useEffect(() => {
    const { language } = formValue;
    i18n.changeLanguage(language);
    if (language === 'ar') {
      setFormValue({ ...formValue, dir: 'rtl' });
      set('dir', 'rtl');
    } else {
      setFormValue({ ...formValue, dir: 'ltr' });
      set('dir', 'ltr');
    }
  }, [formValue.language]);
  return (
    <NavStyled>
      <Navigator />
      {/* {renderSearch()} */}

      <Form formValue={formValue} onChange={setFormValue}>
        <Div ml={100} width={450} display="flex">
          <CRSelectInput
            name="branchId"
            data={organizationBranches}
            onSelect={val => set('branch', val)}
            style={{ width: '200px', margin: '0px 20px' }}
          />
          <CRSelectInput
            name="language"
            data={languages}
            onSelect={val => set('language', val)}
            style={{ width: '200px' }}
          />
        </Div>
      </Form>

      <Div
        flexGrow={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          width={280} //180
        >
          <Div mr={10} mt={1} fs={18} fontWeight="bold">
            {user?.name}
          </Div>
          <Avatar onClick={onClickAvatar} url={avatar} />

          <Whisper
            trigger="click"
            ref={notificationsRef}
            speaker={
              <Popover full>
                <Notifications
                  notifications={notifications}
                  onClear={onClear}
                  onClose={() => notificationsRef.current.close()}
                />
              </Popover>
            }
            full
          >
            <Div>
              <NotificatinBadge count={notifications.length} />
            </Div>
          </Whisper>
          <Whisper
            trigger="click"
            ref={settingsRef}
            speaker={
              <Popover full>
                <Settings
                  onLogout={onLogout}
                  onClose={() => settingsRef.current.close()}
                />
              </Popover>
            }
            full
          >
            <SettingsIcon />
          </Whisper>
        </Div>
      </Div>
    </NavStyled>
  );
};

Navbar.propTypes = {};

export default Navbar;
