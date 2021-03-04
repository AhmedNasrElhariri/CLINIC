import styled from 'styled-components';
import { H6, H7 } from 'components';

export const SessionNameStyled = styled(H6)`
  text-decoration: underline;
`;

export const DeleteLinkStyled = styled(H7)`
  color: ${props => props.theme.colors.red};
  font-size: 12px;
  margin-left: 8px;
`;

export const Container = styled.div`
  display: flex;
  margin: 44px 47px;
`;
export const StyledSeesion = styled.div`
  width: 396px;
  margin-right: 53px;
`;
export const StyledDiscount = styled.div`
  width: 307px;
`;
export const Button = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
`;
export const SummaryStyled = styled.div`
  width: 109px;
  margin: 35px 191px 9px 7px;
  font-family: SegoeUI;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #283148;
`;
export const PriceStyled = styled.div`
  width: 307px;
  height: 64px;
  margin: 9px 0px 12px 0px;
  padding: 6px 6px 8px 12px;
  background-color: #f0f1f1;
`;
export const ButtonsDiv = styled.div`
  display: flex;
  margin: 0px 47px 33px 47px;
`;

export const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
`;
