import React, { useState, useMemo, useEffect } from 'react';
import * as R from 'ramda';
import ListLabDocs from './list-lab-docs';
import { SelectPicker } from 'rsuite';
import { GET_PATIENT_LABS_History } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import { formatDate } from 'utils/date';

const HistoryLabs = ({ patient }) => {
  const [formValue, setFormValue] = useState([]);
  const [lab, setLab] = useState({});
  useEffect(() => {
    if (Object.keys(lab).length !== 0) {
      setFormValue([...formValue, lab]);
    }
  }, [formValue, lab]);
  const status = 'completed';
  const patientId = patient.id;
  const { data } = useQuery(GET_PATIENT_LABS_History, {
    variables: { status: status, patientId: patientId },
  });
  const patientLabDocs = useMemo(() => R.propOr([], 'patientLabDocs')(data), [
    data,
  ]);
  const labDocs = patientLabDocs.map(element => {
    return {
      label: element.labDefinition.name,
      value: {
        name: element.labDefinition.name,
        value: element.value,
        date: formatDate(element.resultDate),
        results: 'view Images',
      },
      category: element.labDefinition.name,
    };
  });
  return (
    <>
      <SelectPicker
        virtualized={false}
        name="lab"
        onSelect={setLab}
        data={labDocs}
        block
        groupBy="category"
        style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
      />
      <ListLabDocs labs={formValue} />
    </>
  );
};

HistoryLabs.propTypes = {};

export default HistoryLabs;
