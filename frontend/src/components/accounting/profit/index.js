import React, { memo } from 'react';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
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

const Profit = ({ expenses, revenues }) => {
  const { t } = useTranslation();
  return (
    <ContainerStyled>
      <Box name={t('revenues')} value={revenues} />
      <Box name={t('expenses')} value={expenses} />
      <Box name={t('profit')} value={revenues - expenses} />
    </ContainerStyled>
  );
};

Profit.propTypes = {};

export default memo(Profit);
