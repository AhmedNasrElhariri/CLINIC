import styled from 'styled-components';
import { CRModal } from 'components';
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
`;
export const StyledImage = styled.img`
  margin-top: 14px;
  border: 1px solid gray;
  padding: 10px;
`;

export const ContainerStyled = styled(CRModal.CRContainer)`
  width: 780px;
  z-index: 2;

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(40, 49, 72, 0.1);
    padding: 0;
  }

  & .rs-modal-body {
    margin-right: 20px;
    max-height: calc(100vh - 20rem) !important;
  }
`;
