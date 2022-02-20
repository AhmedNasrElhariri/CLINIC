import { CRNumberInput, Div } from 'components';
import React, { useEffect } from 'react';
import { Form } from 'rsuite';
const DoctorsTab = ({ appointment, doctorFees, setDoctorFees }) => {
  const { doctor } = appointment;
  useEffect(() => {
    setDoctorFees({ ...doctorFees, doctorId: doctor.id });
  }, [appointment]);
  return (
    <Form formValue={doctorFees} onChange={setDoctorFees}>
      <Div mt={20} display="flex" justifyContent="space-around">
        <Div>Doctor</Div>
        <Div>{doctor.name}</Div>
      </Div>
      <Div mt={20} ml={50}>
        <CRNumberInput name="fees" label="Doctor Fees" />
      </Div>
    </Form>
  );
};
export default DoctorsTab;
