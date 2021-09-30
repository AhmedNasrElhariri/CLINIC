import React from 'react';
import PropTypes from 'prop-types';
import { CRButton, Div } from 'components';
import { ModalFooterStyled } from './style';
import { Spinner } from 'components/widgets/button/spinner';

const Footer = ({ okTitle, cancelTitle, onOk, onCancel, loading }) => (
  <ModalFooterStyled>
    <Div display="flex" justifyContent="flex-end">
      <CRButton minWidth={120} onClick={onCancel} variant="light">
        {cancelTitle}
      </CRButton>
      {loading ? (
        <CRButton minWidth={120}  disabled ml={4} onClick={onOk}>
          {loading ? <Spinner /> : okTitle}
        </CRButton>
      ) : (
        <CRButton minWidth={120} ml={4} onClick={onOk}>
          {loading ? <Spinner /> : okTitle}
        </CRButton>
      )}
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
