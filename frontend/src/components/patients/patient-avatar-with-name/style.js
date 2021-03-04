import styled from 'styled-components';
import { Div, P } from 'components';

export const PatientInfoStyled = styled(Div)`
  width: 70%;
  padding: 30px 10px;
  display: flex;
  align-items: center;
`;
export const PatientAvatarStyled = styled(Div)`
  width: 81px;
  height: 81px;
`;
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
export const SpanTitle = styled.span`
  margin: 5px 465px 20px 11px;
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #50c7f2;
`;
export const SubText = styled(P)`
  padding-right: 10px;
  text-transform: capitalize;
`;
export const SmallText = styled.small`
  color: gray;
  padding-left: 10px;
  text-transform: capitalize;
`;
export const PatientDetails = styled.div`
  margin: 5px 11px 28px;
  font-family: SegoeUI;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  text-align: left;
  color: #283148;
  text-align: center;
`;
