import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import { H3, Div, CRButton } from 'components';
import WorkingHours from './working-hours';
import AppointmentInfo from './clinic-info';
import { UPDATE_CLINIC } from 'apollo-client/queries';
import useGlobalState from 'state';

const initialValues = {
  examinationPrice: 0,
  followupPrice: 0,
  urgentPrice: 0,
  duration: 5,
  appointmentsCount: 20,
};

function ClinicInfo() {
  const [clinic, setCurrentClinic] = useGlobalState('currentClinic');
  const [formValue, setFormValue] = useState(initialValues);

  const [updateClinic] = useMutation(UPDATE_CLINIC, {
    onCompleted: () => {
      Alert.success('Clinic Info has been Updated Successfully');
      setCurrentClinic({
        ...clinic,
        ...formValue,
      });
    },
    onError: () => Alert.error('Invalid Input'),
  });

  useEffect(() => {
    if (!R.isEmpty(clinic)) {
      const val = R.pick([
        'examinationPrice',
        'followupPrice',
        'urgentPrice',
        'duration',
        'appointmentsCount',
      ])(clinic);
      setFormValue(val);
    }
  }, [clinic]);

  const handleSave = useCallback(() => {
    updateClinic({
      variables: {
        clinic: { ...formValue, id: clinic.id },
      },
    });
  }, [clinic, formValue, updateClinic]);

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Clinic Info</H3>
        <Div>
          <CRButton onClick={handleSave} primary>
            Save
          </CRButton>
        </Div>
      </Div>
      <AppointmentInfo formValue={formValue} onChange={setFormValue} />
      <H3 my={64}>Working Hours</H3>
      <WorkingHours />
    </>
  );
}

export default ClinicInfo;
