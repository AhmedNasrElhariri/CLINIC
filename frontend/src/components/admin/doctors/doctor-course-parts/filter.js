import { Div, CRSelectInput, CRButton } from 'components';
import { Form } from 'rsuite';
const Filter = ({ filter, setFilter, doctors, t, onAddPartToDoctor }) => {
  return (
    <Div
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt="30px"
      mb="20px"
    >
      <Form formValue={filter} onChange={setFilter}>
        <Div display="flex">
          <CRSelectInput
            label={t('doctor')}
            name="doctorId"
            labelKey="name"
            valueKey="id"
            block
            data={doctors}
            style={{ width: '200px', marginRight: '20px' }}
          />
        </Div>
      </Form>
      <CRButton onClick={onAddPartToDoctor} mt="35px">
        {t('addCoursePartToDoctor')}
      </CRButton>
    </Div>
  );
};
export default Filter;
