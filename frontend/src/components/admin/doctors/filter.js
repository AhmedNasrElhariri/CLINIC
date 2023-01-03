import { Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';
const Filter = ({ filter, setFilter, doctors, t }) => {
  return (
    <Div display="flex" justifyContent="center" alignItems="center" mt="30px">
      <Form formValue={filter} onChange={setFilter}>
        <CRSelectInput
          label={t('doctor')}
          name="doctorId"
          labelKey="name"
          valueKey="id"
          block
          data={doctors}
          style={{ width: '200px' }}
        />
      </Form>
    </Div>
  );
};
export default Filter;
