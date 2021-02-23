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
export const AppliedButton = styled.button`
width: 61px;
height: 35px;
padding: 9.5px 9px 9.5px 10px;
border-radius: 5px;
background-color: #e50124;
color: #ffffff;
`;
