import styled from 'styled-components';

import { Div } from 'components';

export const ContainerStyled = styled(Div)`
  padding: 15px 25px;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  background: ${props => props.theme.colors.text};
`;
