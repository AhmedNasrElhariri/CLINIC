import { CRSelectInput, Div, CRDateRangePicker } from 'components';
import { Form } from 'rsuite';

const Filter = ({ formValue, setFormValue, setPeriod, t, items }) => {
  return (
    <Form
      formValue={formValue}
      onChange={setFormValue}
      className="mt-2 mb-7 flex"
    >
      <CRSelectInput
        label={t('item')}
        name="item"
        data={items}
        valueKey="id"
        labelKey="name"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <Div width={256}>
        <Form fluid>
          <CRDateRangePicker
            name=""
            label="Date from-to"
            placeholder={t('timeframe')}
            size="sm"
            block
            small
            $noLabel
            onChange={setPeriod}
            placement="auto"
          />
        </Form>
      </Div>
    </Form>
  );
};
export default Filter;
