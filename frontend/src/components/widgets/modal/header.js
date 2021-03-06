import React from 'react';

import { H4, Div } from 'components';
import { ModalHeaderStyled } from './style';

const Header = ({ title }) => (
  <ModalHeaderStyled>
    <Div>
      <H4
        fontWeight="bold"
        opacity={1}
        textTransform="uppercase"
        textAlign="center"
      >
        {title}
      </H4>
    </Div>
  </ModalHeaderStyled>
);

export default Header;
