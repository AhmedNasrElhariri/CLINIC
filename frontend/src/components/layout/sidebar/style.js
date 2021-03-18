import styled from 'styled-components';
import css from '@styled-system/css';
import { Link } from 'react-scroll';

export const ContainerStyled = styled.div`
  height: 100vh;
  background-color: #ffffff;

  ${css({
    minWidth: [175],
  })}
`;
export const IconDiv = styled.div`
  margin-left: 11px;
  margin-right: 17px;
`;
export const LinkName = styled.div`
`;
export const Fab = styled.div`
  position: absolute;
  right: 13px;
  bottom: 8px;
`;
export const BodyStyled = styled.div`
  padding-top: ${props => props.theme.navbar.height};
`;

export const ItemStyled = styled(Link)`
  ${css({
    paddingLeft: [20, 35, 50, 50, 100],
  })}
  padding-top: ${props => props.theme.navbar.height};
`;
export const LinkCounter = styled.div`
  display: flex;
  align-items: center;
`;
