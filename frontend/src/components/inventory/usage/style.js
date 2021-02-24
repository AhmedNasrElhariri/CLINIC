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
export const ItemDiv = styled.div`
width: 396px;
margin: 44px 31px 44px 83px;
`;
export const QualityDiv = styled.div`
width: 104px;
margin: 44px 236px 44px 0px; 
`;
export const Container = styled.div`
display: flex;
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
export const ButtonsDiv = styled.div`
  display: flex;
  margin-bottom: 33px;
`;