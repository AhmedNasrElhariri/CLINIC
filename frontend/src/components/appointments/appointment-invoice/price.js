import NumberFormat from 'react-number-format';
import { H5, Div } from 'components';

export default function Price({ name, price, variant }) {
  return (
    <Div display="flex" justifyContent="space-between" mb={1}>
      <H5 variant={variant} weight="semiBold">
        {name}
      </H5>
      <H5 variant={variant} weight="semiBold">
        EGP <NumberFormat value={price} displayType="text" thousandSeparator />
      </H5>
    </Div>
  );
}
