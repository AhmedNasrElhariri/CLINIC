import styled from 'styled-components';
import css from '@styled-system/css';

import { Div } from 'components';

export const PatientInfoStyled = styled(Div)`
  width: 310px;
  min-width: 310px;
  ${css({
    marginLeft: [20, 35, 50, 55, 64],
  })}
`;
