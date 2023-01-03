import { memo } from 'react';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { Div, H6 } from 'components';
import { ContainerStyled } from './style';

const Box = ({ name, value }) => (
  <Div>
    <H6 fontWeight={800} color="white">
      {name} = {'  '}
      {value}
      {/* <NumberFormat value={value} displayType="text" thousandSeparator /> */}
    </H6>
  </Div>
);

const Total = ({ total }) => {
  const { t } = useTranslation();
  return (
    <ContainerStyled>
      <Box name={t('total')} value={total} />
    </ContainerStyled>
  );
};

export default Total;
