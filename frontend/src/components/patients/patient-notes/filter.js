import { CRDateRangePicker, Div } from 'components/widgets';
import { Form } from 'rsuite';
const Filter = ({ setPeriod, t }) => {
  return (
    <Div width={256} ml="20px">
      <Form fluid>
        <CRDateRangePicker
          name=""
          placeholder={t('Date from-to ')}
          size="sm"
          block
          small
          $noLabel
          onChange={setPeriod}
          placement="auto"
        />
      </Form>
    </Div>
  );
};
export default Filter;
