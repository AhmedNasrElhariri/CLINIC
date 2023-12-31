import styled from 'styled-components';
import { CRModal } from 'components';
export const Title = styled.div`
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #283148;
  margin-bottom: 15px;
  margin-left: 30px;
  &.rs-modal-header {
    padding: 27px;
    border-bottom: none;
  }
`;
export const Container = styled.div`
  flex-direction: row;
  width: 435px;
  height: 63px;
  background-color: #f4f4f6;
  position: relative;
  margin-bottom: 2px;
  margin-left: 26px;
`;
export const Medicine = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  padding-left: 8px;
  color: #727272;
  position: absolute;
  display: inline;
  left: 8px;
  top: 10px;
`;
export const Button = styled.button`
  width: 40px;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: right;
  color: #e50124;
  background-color: #f4f4f6;
  position: absolute;
  right: 25px;
  bottom: 24px;
`;
export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
export const Li = styled.li`
  padding: 0px;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  width: 42px;
`;
export const FooterButton = styled.button`
  height: 34px;
  background-color: ${props => props.bkColor};
  margin-left: ${props => props.marginLeft};
  margin-top: 23px;
  margin-right: ${props => props.marginRight};
  dislay: inline;
  width: ${props => props.width};
  color: ${props => props.color};
  margin-bottom: 35px;
`;
export const PrescriptionPrintout = styled.div`
  width: 420px;
  height: 595px;
  padding: 80px 50px;
`;
export const MedicineName = styled.h4`
  color: blue;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ContainerStyled = styled(CRModal.CRContainer)`
  width: 520px;
  height: 595px;
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

export const ModalBodyStyled = styled(CRModal.CRBody)`
  padding: 36px;
  margin-top: 0px;
`;
