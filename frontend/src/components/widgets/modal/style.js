import styled from 'styled-components';
import { Modal } from 'rsuite';
import { space } from 'styled-system';

export const ModalStyled = styled(Modal)`
  ${space}
  width: ${({ width }) => (width ? width + 'px' : '810px')};

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(40, 49, 72, 0.1);
    border-radius: 17px;
    padding: 0;
  }

  & .rs-modal-body {
    margin-top: 0;
    overflow: inherit;
    max-height: none !important;
  }
`;

export const ModalHeaderStyled = styled(Modal.Header)`
  padding: 35px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const ModalBodyStyled = styled(Modal.Body)`
  padding: 40px 160px 40px 160px;
  ${space}
`;

export const ModalFooterStyled = styled(Modal.Footer)`
  padding: 35px 0px;
`;
