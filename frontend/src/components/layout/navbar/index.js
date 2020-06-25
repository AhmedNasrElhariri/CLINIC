import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'rsuite';
import { NavStyled } from './style';
import { CRTextInput, Div } from 'components';

import SwitchClinic from './switch-clinic';
import Avtar from './avatar';
import { NotificationIcon, SettingsIcon } from 'components/icons/index';

const Navbar = ({ toggleSettings, toggleNotification }) => {
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
          maxWidth={630}
        >
          <SwitchClinic />
          <NotificationIcon onClick={toggleNotification} />
          <SettingsIcon textAlign="center" onClick={toggleSettings} />
          <Avtar />
        </Div>
      </Div>
    </NavStyled>
  );
};

Navbar.propTypes = {
  toggleSettings: PropTypes.func.isRequired,
  toggleNotification: PropTypes.func.isRequired,
};

export default Navbar;
