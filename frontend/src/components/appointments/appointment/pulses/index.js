import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';

import { Div } from 'components';
import PulseRow from './pulse-row';

const AppointmentPulses = ({ pulses, onChange }) => {
 
  return (
    <Div>
          <PulseRow
            formValue={pulses}
            setFormValue={onChange}
          />
    </Div>
  );
};

export default AppointmentPulses;
