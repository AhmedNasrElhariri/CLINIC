import { Div, CRSelectInput, CRButton } from 'components';
import { Form } from 'rsuite';
import { DoctorTypes } from 'utils/constants';
const Filter = ({ filter, setFilter, doctors, t, onAddSessionToDoctor }) => {
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
          <CRSelectInput
            label={t('internalExternal')}
            name="referedDoctor"
            block
            data={DoctorTypes}
            style={{ width: '200px', marginRight: '20px' }}
          />
        </Div>
      </Form>
      <CRButton onClick={onAddSessionToDoctor} mt="35px">
        {t('addSessionToDoctor')}
      </CRButton>
    </Div>
  );
};
export default Filter;
