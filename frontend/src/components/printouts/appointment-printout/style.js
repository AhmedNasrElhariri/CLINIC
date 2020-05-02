import styled from 'styled-components';
import { Panel } from 'rsuite';

export const ContainerStyled = styled.div`
  @media print {
    padding: 50px;
  }
`;

export const PanelStyled = styled(Panel)`
  margin-bottom: 2rem;
`;
