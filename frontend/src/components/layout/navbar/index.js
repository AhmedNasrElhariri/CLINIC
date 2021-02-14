import React, { useRef } from 'react';

import { Whisper, Popover } from 'rsuite';
import { NavStyled, BadgeStyled } from './style';
import { Div } from 'components';

import { NotificationIcon, SettingsIcon } from 'components/icons/index';
import Notifications from 'components/functional/notifications';
import Settings from 'components/functional/settings';
import Avatar from './avatar';

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
  renderSearch,
  avatar,
  notifications,
  onClear,
}) => {
  const notificationsRef = useRef();
  const settingsRef = useRef();

  return (
    <NavStyled>
      {renderSearch()}
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
          width={180}
        >
          <Whisper
            placement="bottomEnd"
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
            placement="bottomEnd"
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
