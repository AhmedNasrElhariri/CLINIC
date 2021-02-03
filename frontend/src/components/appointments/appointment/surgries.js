import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import NumberFormat from 'react-number-format';
import { Modal, Whisper, Tooltip } from 'rsuite';

import { Div, H6, CRNav, CRVDivider, H3, CRButton, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { useModal } from 'components/widgets/modal';
import SummaryTable from '../../patients/summary-table';
import { capitalize } from 'utils/text';
// import { KeyStyled, ValueStyled } from './style';
import AppointmentGallery from '../images/gallery';
import AppointmentData from './appointment-data';
import useSuergriesAppointments from 'hooks/use-surgries-appoitnemtns';
import ListSurgeries from './list-surgeries';
import { useHistory } from 'react-router-dom';

const PatientSurgries = ({ patientId, tabularFields, tabularData }) => {
  const history = useHistory();
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
