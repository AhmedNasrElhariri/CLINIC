import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Form, Whisper, Popover } from 'rsuite';
import { NavStyled } from './style';
import { CRTextInput, Div } from 'components';

import SwitchClinic from './switch-clinic';
import Avtar from './avatar';
import { NotificationIcon, SettingsIcon } from 'components/icons/index';
import Notifications from 'components/functional/notifications';
import Settings from 'components/functional/settings';

const Navbar = ({ onSelectClinic, clinics, currentClinic, onLogout }) => {
  const notificationsRef = useRef();
  const settingsRef = useRef();

  return (
    <NavStyled>
      <Form style={{ width: 276 }}>
        <CRTextInput name="body" placeholder="Search">
          search
        </CRTextInput>
      </Form>
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
          maxWidth={430}
        >
          <SwitchClinic
            onSelectClinic={onSelectClinic}
            clinics={clinics}
            currentClinic={currentClinic}
          />
          <Whisper
            placement="bottomEnd"
            trigger="click"
            triggerRef={notificationsRef}
            speaker={
              <Popover full>
                <Notifications
                  onClose={() => notificationsRef.current.hide()}
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
            triggerRef={settingsRef}
            speaker={
              <Popover full>
                <Settings
                  onLogout={onLogout}
                  onClose={() => settingsRef.current.hide()}
                />
              </Popover>
            }
            full
          >
            <SettingsIcon />
          </Whisper>

          {/* <Avtar /> */}
        </Div>
      </Div>
    </NavStyled>
  );
};

Navbar.propTypes = {};

export default Navbar;
