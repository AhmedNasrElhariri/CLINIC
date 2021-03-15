import styled from 'styled-components';
import { Modal } from 'rsuite';
import { space } from 'styled-system';

export const ModalStyled = styled(Modal)`
  ${space}
  width: ${({ width }) => (width ? width + 'px' : '810px')};

  & .rs-modal-content {
    z-index: 99999999;
  }

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    padding: 0;
    border-radius:0px;
  }

  & .rs-modal-body {
    margin-top: 0;
    margin-right: 20px;
    max-height: calc(100vh - 10rem) !important;
  }
  & .rs-modal-header .rs-modal-header-close {
    outline: 0;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 12px;
    line-height: 1.66666667;
    color: #575757;
    width: 27px;
    height: 27px;
    padding: auto;
    background: #eef1f1;
    border-style: none;
    border-radius: 50%;
  }
`;

export const ModalHeaderStyled = styled(Modal.Header)`
  padding: 27px;
`;

export const ModalBodyStyled = styled(Modal.Body)`
  padding: 40px 160px 40px 160px;
  ${space}
`;

export const ModalFooterStyled = styled(Modal.Footer)`
  padding: 35px 0px;
`;
