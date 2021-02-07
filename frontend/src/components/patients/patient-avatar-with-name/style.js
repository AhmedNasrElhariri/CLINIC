import styled from "styled-components";
import { Div,P } from "components";

export const PatientInfoStyled = styled(Div)`
  width: 70%;
  padding: 30px 10px;
  display: flex;
  align-items: center;
`;
export const PatientAvatarStyled = styled(Div)`
  width: 120px;
  height: 120px;
`;
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
export const SpanTitle=styled.span`
  color:#51C6F3;
  padding: 0 5px;
  font-weight:bold;
`
export const SubText= styled(P)`
  padding-right:10px;
  text-transform:capitalize;
`;
export const SmallText = styled.small`
  color:gray;
  padding-left: 10px;
  text-transform: capitalize;
`;