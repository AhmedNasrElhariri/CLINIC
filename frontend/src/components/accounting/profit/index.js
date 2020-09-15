import React, { memo } from 'react';
import NumberFormat from 'react-number-format';

import { Div, H6 } from 'components';
import { ContainerStyled } from './style';

const Box = ({ name, value }) => (
  <Div>
    <H6 fontWeight={800} color="white">
      {name} ={' '}
      <NumberFormat value={value} displayType={'text'} thousandSeparator />
    </H6>
  </Div>
);

const Profit = ({ expenses, revenues }) => {
  return (
    <ContainerStyled>
      <Box name="Revenues" value={revenues} />
      <Box name="Expenses" value={expenses} />
      <Box name="Profit" value={revenues - expenses} />
    </ContainerStyled>
  );
};

Profit.propTypes = {};

export default memo(Profit);
