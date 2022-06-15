import React, { memo } from 'react';
import NumberFormat from 'react-number-format';

import { Div, H6 } from 'components';
import { ContainerStyled } from './style';
import { useTranslation } from 'react-i18next';

const Box = ({ name, value }) => (
  <Div>
    <H6 fontWeight={800} color="white">
      {name} ={' '}
      <NumberFormat value={value} displayType="text" thousandSeparator />
    </H6>
  </Div>
);

const Profit = ({ totalPrice, totalCost }) => {
  const { t } = useTranslation();
  return (
    <ContainerStyled>
      <Box name={t('totalSales')} value={totalPrice} />
      <Box name={t('totalCost')} value={totalCost} />
      <Box name={t('profit')} value={totalPrice - totalCost} />
    </ContainerStyled>
  );
};

Profit.propTypes = {};

export default memo(Profit);
