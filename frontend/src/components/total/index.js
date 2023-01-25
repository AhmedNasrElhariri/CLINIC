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

const Total = ({ totals }) => {
  const { t } = useTranslation();
  console.log(totals);
  const keys = Object.keys(totals);
  keys.forEach(key => {
    console.log(key);
  });

  return (
    <ContainerStyled>
      {keys.map(key => (
        <Div display="flex" color="white">
          <Div>{t(key)} </Div>
          <Div>
            {' '}
            {': '}
            {Math.round((totals[key] + Number.EPSILON) * 100) / 100}
          </Div>
        </Div>
      ))}
      {/* <Box name={t('total')} value={total} /> */}
    </ContainerStyled>
  );
};

export default Total;
