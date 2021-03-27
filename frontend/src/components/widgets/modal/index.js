import React from 'react';

import { ModalStyled, ModalHeaderStyled, ModalBodyStyled } from './style';

import CRHeader from './header';
import CRFooter from './footer';

const Modal = ({
  CRContainer,
  CRBody,
  CRHeader,
  children,
  header,
  bodyStyle,
  headerStyle,
  footerStyle,
  show,
  width,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
  CancelFooter,
  CancelHeader,
  loading,
  ...props
}) => {
  return (
    <CRContainer show={show} width={width} {...props}>
      {CancelHeader ? (
        ''
      ) : (
        <CRHeader {...headerStyle} title={header}></CRHeader>
      )}
      <CRBody style={bodyStyle}>
        {children}
        {CancelFooter ? (
          ''
        ) : (
          <CRFooter
            okTitle={okTitle}
            cancelTitle={cancelTitle}
            onOk={onOk}
            loading={loading}
            onCancel={onCancel}
            {...footerStyle}
          />
        )}
      </CRBody>
    </CRContainer>
  );
};

Modal.CRContainer = ModalStyled;
Modal.CRBody = ModalBodyStyled;
Modal.CRHeader = ModalHeaderStyled;

Modal.defaultProps = {
  CRContainer: ModalStyled,
  CRBody: ModalBodyStyled,
  CRHeader,
  CRFooter,
  containerProps: {},
  bodyStyle: {},
  headerStyle: {},
  footerStyle: {},
  show: false,
};

export default Modal;
