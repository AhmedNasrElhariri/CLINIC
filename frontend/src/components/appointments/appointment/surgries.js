import React, { useCallback } from 'react';

import { Div } from 'components';
import useSuergriesAppointments from 'hooks/use-surgries-appoitnemtns';
import ListSurgeries from './list-surgeries';

const PatientSurgries = ({ patientId }) => {
  const { surgeries } = useSuergriesAppointments({
    patientId,
  });

  const handleClickSurgery = useCallback(({ appointment }) => {
    window.open(`/appointments/${appointment.id}`);
  }, []);

  return (
    <Div>
      <Div px={5} py={2}>
        <ListSurgeries surgeries={surgeries} onClick={handleClickSurgery} />
      </Div>
      <Div position="absolute" top={0} right={3}></Div>
    </Div>
  );
};

PatientSurgries.defaultProps = {
  surgries: [],
};

export default PatientSurgries;
