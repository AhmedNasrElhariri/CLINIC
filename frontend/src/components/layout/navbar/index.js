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
  setFormValue
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
  return (
    <NavStyled>
      <Navigator />
      {/* {renderSearch()} */}
      <Div ml={200} width={300}>
        <Form formValue={formValue} onChange={setFormValue}>
          <CRSelectInput
            name="branchId"
            block
            data={organizationBranches}
            onSelect={val => set('branch', val)}
            style={{ width: '250px' }}
          />
        </Form>
      </Div>
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
          width={90} //180
        >
          {/* <Whisper
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
          </Whisper> */}
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

          <Avatar onClick={onClickAvatar} url={avatar} />
        </Div>
      </Div>
    </NavStyled>
  );
};

Navbar.propTypes = {};

export default Navbar;
