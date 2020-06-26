import styled from 'styled-components';
import { Panel, FlexboxGrid } from 'rsuite';
import { styles } from 'components/widgets/html';
import css from '@styled-system/css';

import { Div } from 'components';

export const FlexboxGridItemStyled = styled(FlexboxGrid.Item)`
  ${styles}
`;

export const PanelStyled = styled(Panel)`
  display: 'inline-block';
  width: '100%';
`;

export const HomeSidebarStyled = styled(Div)`
  ${css({
    width: [100, 200, 200, 240, 300],
  })}
`;

export const PatientInfoStyled = styled(Div)`
  width: 310px;
  min-width: 310px;
  ${css({
    marginLeft: [20, 35, 50, 55, 64],
  })}
`;
