import React from 'react';
import PropTypes from 'prop-types';

import { CRButton, Div } from 'components';
import { ModalFooterStyled } from './style';

const Footer = ({ okTitle, cancelTitle, onOk, onCancel }) => (
  <ModalFooterStyled>
    <Div display="flex" justifyContent="center">
      <CRButton minWidth={120} mr={4} midRound  onClick={onOk} primary>
        {okTitle}
      </CRButton>
      <CRButton minWidth={120} ml={4} midRound  onClick={onCancel}>
        {cancelTitle}
      </CRButton>
    </Div>
  </ModalFooterStyled>
);

Footer.propTypes = {
  okTitle: PropTypes.string,
  cancelTitle: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Footer.defaultProps = {
  okTitle: 'Ok',
  cancelTitle: 'Cancel',
};

export default Footer;
