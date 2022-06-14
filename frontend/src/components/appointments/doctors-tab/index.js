import { CRNumberInput, Div,CRRadio } from 'components';
import React, { useEffect } from 'react';
import { Form } from 'rsuite';
const payOptions = [
  { name: 'Fixed', value: 'fixed' },
  { name: 'Percentage', value: 'percentage' },
];
const DoctorsTab = ({
  appointment,
  doctorFees,
  setDoctorFees,
  doctorOption,
  setDoctorOption,
}) => {
  const { doctor } = appointment;
  useEffect(() => {
    setDoctorFees({
      ...doctorFees,
      doctorId: doctor.id,
      doctorName: doctor.name,
    });
  }, [appointment]);
  return (
    <>
      <Div mt={20} display="flex" justifyContent="space-around">
        <Div>Doctor</Div>
        <Div>{doctor.name}</Div>
      </Div>
      <Form formValue={doctorOption} onChange={setDoctorOption}>
        <CRRadio options={payOptions} name="option" />
        <Form formValue={doctorFees} onChange={setDoctorFees}>
          <>
            {doctorOption.option === 'fixed' ? (
              <CRNumberInput label="Fixed Doctor Fees" name="fees" />
            ) : (
              <CRNumberInput name="fees" label="Percentage Doctor Fees" />
            )}
          </>
        </Form>
      </Form>
    </>
  );
};
export default DoctorsTab;
