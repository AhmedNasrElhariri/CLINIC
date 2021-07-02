import React from 'react';

import { Div } from 'components';
import PulseRow from './pulse-row';

const AppointmentPulses = ({
  pulses,
  onChange,
  sessionsPulses,
  sessionFormValue,
  setSessionFormValue,
}) => {
  return (
    <Div>
      <PulseRow
        formValue={pulses}
        setFormValue={onChange}
        sessionsPulses={sessionsPulses}
        sessionFormValue={sessionFormValue}
        setSessionFormValue={setSessionFormValue}
      />
    </Div>
  );
};

export default AppointmentPulses;
