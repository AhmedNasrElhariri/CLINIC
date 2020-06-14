import styled from 'styled-components';
import { Panel, FlexboxGrid } from 'rsuite';
import { styles } from 'components/widgets/html';



export const FlexboxGridItemStyled = styled(FlexboxGrid.Item)`
  ${styles}
`;

export const PanelStyled = styled(Panel)`
  display: 'inline-block';
  width: '100%';
`;
