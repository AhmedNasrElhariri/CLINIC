import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Whisper, Popover } from 'rsuite';
import { NavStyled } from './style';
import { Div } from 'components';

import SwitchClinic from './switch-clinic';
import { NotificationIcon, SettingsIcon } from 'components/icons/index';
import Notifications from 'components/functional/notifications';
import Settings from 'components/functional/settings';
import Avatar from './avatar';

const Navbar = ({
  onSelectClinic,
  clinics,
  currentClinic,
  onLogout,
  onClickAvatar,
  renderSearch,
  avatar,
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
        ml={[1, 4, 4, 4, 0]}
      >
        <Div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          width="100%"
          maxWidth={530}
        >
          <SwitchClinic
            onSelectClinic={onSelectClinic}
            clinics={clinics}
            currentClinic={currentClinic}
          />
          <Whisper
            placement="bottomEnd"
            trigger="click"
            ref={notificationsRef}
            speaker={
              <Popover full>
                <Notifications
                  onClose={() => notificationsRef.current.close()}
                />
              </Popover>
            }
            full
          >
            <NotificationIcon />
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
