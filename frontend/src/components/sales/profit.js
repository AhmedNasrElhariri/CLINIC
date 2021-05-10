import React, { memo } from 'react';
import NumberFormat from 'react-number-format';

import { Div, H6 } from 'components';
import { ContainerStyled } from './style';

const Box = ({ name, value }) => (
  <Div>
    <H6 fontWeight={800} color="white">
      {name} ={' '}
      <NumberFormat value={value} displayType="text" thousandSeparator />
    </H6>
  </Div>
);

const Profit = ({ totalPrice, totalCost }) => {
  return (
    <ContainerStyled>
      <Box name="Total Sales" value={totalPrice} />
      <Box name="Total Cost" value={totalCost} />
      <Box name="Profit" value={totalPrice - totalCost} />
    </ContainerStyled>
  );
};

Profit.propTypes = {};

export default memo(Profit);
