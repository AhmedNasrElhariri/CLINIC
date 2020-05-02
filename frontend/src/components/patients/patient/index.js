import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Nav } from 'rsuite';

import { GET_PATIENT } from 'apollo-client/queries';
import { H5, Div, PatientHistory, PatientProgress } from 'components';

const tabs = ['History', 'Progress'];

function Appointment() {
  let { patientId } = useParams();
  const { data } = useQuery(GET_PATIENT, {
    variables: {
      id: patientId,
    },
  });

  const [activeTab, setActiveTab] = useState('0');
  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const patient = R.propOr({}, 'patient')(data);
  const appointments = R.pipe(R.pathOr([], ['patient', 'appointments']))(data);

  return (
    <>
      <H5 mb={2}>{patient.name}</H5>
      <Div display="flex" justifyContent="space-between">
        <Nav appearance="tabs" activeKey={activeTab} onSelect={setActiveTab}>
          {tabs.map((t, idx) => (
            <Nav.Item eventKey={idx + ''} key={idx}>
              {t}
            </Nav.Item>
          ))}
        </Nav>
      </Div>
      <Div py={3}>
        {showComp('0') && <PatientHistory history={appointments} />}
        {showComp('1') && <PatientProgress history={appointments} />}
      </Div>
    </>
  );
}

export default Appointment;
