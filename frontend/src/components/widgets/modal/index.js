import React, { useState, useCallback } from 'react';

import { ModalStyled, ModalHeaderStyled, ModalBodyStyled } from './style';

import CRHeader from './header';
import CRFooter from './footer';

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return { visible, setVisible, open, close };
};

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
  ...props
}) => {
  return (
    <CRContainer show={show} width={width} {...props}>
      <CRHeader {...headerStyle} title={header}></CRHeader>
      <CRBody {...bodyStyle}>
        {children}
        <CRFooter
          okTitle={okTitle}
          cancelTitle={cancelTitle}
          onOk={onOk}
          onCancel={onCancel}
          {...footerStyle}
        />
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
