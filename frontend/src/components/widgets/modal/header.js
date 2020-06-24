import React from 'react';

import { H4, Div } from 'components';
import { ModalHeaderStyled } from './style';

export default ({ title }) => (
  <ModalHeaderStyled>
    <Div>
      <H4 fontWeight="bold" textTransform="uppercase" textAlign="center">
        {title}
      </H4>
    </Div>
  </ModalHeaderStyled>
);
