import styled from 'styled-components';

import { CRModal } from 'components';

export const ContainerStyled = styled(CRModal.CRContainer)`
  position: absolute;
  right: 64px;
  bottom: 170px;
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
export const SecondContainerStyled = styled(CRModal.CRContainer)`
  position: absolute;
  right: 64px;
  bottom: 100px;
  width: 350px;
  z-index: 2;

  & .rs-modal-content {
    box-shadow: -6px 6px 20px 0 rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(40, 49, 72, 0.1);
    background-color: #00b1cc;
    color: #ffffff;
    padding: 0;
  }

  & .rs-modal-body {
    margin-right: 20px;
    max-height: calc(100vh - 20rem) !important;
  }
`;
export const ModalBodyStyled = styled(CRModal.CRBody)`
  padding: 36px;
  margin-top: 0px;
`;
export const SecondModalBodyStyled = styled(CRModal.CRBody)`
  padding: 7px;
  margin-top: 0px;
`;
export const Container = styled.div`
  display: flex;
`;
export const LeftContainer = styled.div`
  width: 320px;
  margin-right: 20px;
`;
export const RightContainer = styled.div`
  width: 320px;
`;
export const SecondRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
