import { Div, CRSelectInput, CRDateRangePicker, CRButton } from 'components';
import { Form } from 'rsuite';
import { feesStatus, DoctorTypesOper } from 'utils/constants';

const Filter = ({ filter, setFilter, doctors, setPeriod, t, children }) => {
  return (
    <Div
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="30px 0px"
    >
      <Form formValue={filter} onChange={setFilter}>
        <Div display="flex" justifyContent="center" alignItems="center">
          <CRSelectInput
            label={t('status')}
            name="status"
            labelKey="name"
            valueKey="value"
            block
            data={feesStatus}
            style={{ width: '200px', marginRight: '20px' }}
          />
          <CRSelectInput
            label={t('type')}
            name="type"
            block
            data={DoctorTypesOper}
            style={{ width: '200px', marginRight: '20px' }}
          />
          <CRSelectInput
            label={t('doctor')}
            name="doctorId"
            labelKey="name"
            valueKey="id"
            block
            data={doctors}
            style={{ width: '200px' }}
          />
        </Div>
      </Form>
      <Div width={256} ml="20px">
        <Form fluid>
          <CRDateRangePicker
            name=""
            label="Date from-to "
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
      {children}
    </Div>
  );
};
export default Filter;
