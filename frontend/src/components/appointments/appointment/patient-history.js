import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Grid, Row, Col, Alert } from 'rsuite';

import { Div, CRNav } from 'components';
import NewHistory from './new-history';
import { MEDICAL_HISTORY_TYPES } from 'utils/constants';
import {
  CREATE_MEDICINE_HISTORY,
  CREATE_FAMILY_HISTORY,
  LIST_MEDICINE_HISTORY,
  LIST_FAMILY_HISTORY,
} from 'apollo-client/queries';
import HistoryBox from './history-box';

const navs = [
  { name: 'Medicine', value: MEDICAL_HISTORY_TYPES.medicine },
  { name: 'Family', value: MEDICAL_HISTORY_TYPES.family },
  // { name: 'Social', value: MEDICAL_HISTORY_TYPES.social },
];

const getProps = (type, h) => {
  switch (type) {
    case MEDICAL_HISTORY_TYPES.medicine:
      return {
        title: h.medicineName,
        subtitle: h.frequency,
        body: h.dose,
        date: h.fromDate
      };
    case MEDICAL_HISTORY_TYPES.family:
      return {
        title: h.disease,
        subtitle: h.relative,
      };
    default:
      return {};
  }
};

const ListHistory = memo(({ type, history }) => (
  <Grid fluid>
    <Row>
      {history.map(h => (
        <Col xs={8} key={h.id}>
          <HistoryBox {...getProps(type, h)} />
        </Col>
      ))}
    </Row>
  </Grid>
));

function PatientHistory({ patient, noAdd }) {
  const [activeNav, setActiveNav] = useState('');
  const [history, setHistory] = useState([]);
  const { data: medicineHistoryData } = useQuery(LIST_MEDICINE_HISTORY, {
    variables: {
      patientId: patient.id,
    },
  });
  const { data: familyHistoryData } = useQuery(LIST_FAMILY_HISTORY, {
    variables: {
      patientId: patient.id,
    },
  });
  const [createMedicineHistory] = useMutation(CREATE_MEDICINE_HISTORY, {
    onCompleted() {
      Alert.success('History has been created');
    },
    update(cache, { data: { createMedicineHistory: history } }) {
      const { medicineHistory } = cache.readQuery({
        query: LIST_MEDICINE_HISTORY,
        variables: {
          patientId: patient.id,
        },
      });
      cache.writeQuery({
        query: LIST_MEDICINE_HISTORY,
        variables: {
          patientId: patient.id,
        },
        data: { medicineHistory: [history].concat(medicineHistory) },
      });
    },
  });

  const [createFamilyHistory] = useMutation(CREATE_FAMILY_HISTORY, {
    onCompleted() {
      Alert.success('History has been created');
    },
    update(cache, { data: { createFamilyHistory: history } }) {
      const { familyHistory } = cache.readQuery({
        query: LIST_FAMILY_HISTORY,
        variables: {
          patientId: patient.id,
        },
      });
      cache.writeQuery({
        query: LIST_FAMILY_HISTORY,
        variables: {
          patientId: patient.id,
        },
        data: { familyHistory: [history].concat(familyHistory) },
      });
    },
  });

  useEffect(() => {
    if (!activeNav) {
      setActiveNav(navs[0]);
    }
  }, [activeNav]);

  const medicineHistory = useMemo(
    () => R.propOr([], 'medicineHistory')(medicineHistoryData),
    [medicineHistoryData]
  );
  const familyHistory = useMemo(
    () => R.propOr([], 'familyHistory')(familyHistoryData),
    [familyHistoryData]
  );

  useEffect(() => {
    const history =
      activeNav.value === MEDICAL_HISTORY_TYPES.medicine
        ? medicineHistory
        : activeNav.value === MEDICAL_HISTORY_TYPES.family
        ? familyHistory
        : [];
    setHistory(history);
  }, [activeNav, familyHistory, medicineHistory]);

  const handleCreate = useCallback(
    formValue => {
      switch (activeNav.value) {
        case MEDICAL_HISTORY_TYPES.medicine:
          createMedicineHistory({
            variables: {
              medicineHistory: {
                ...formValue,
                patientId: patient.id,
              },
            },
          });
          break;
        case MEDICAL_HISTORY_TYPES.family:
          createFamilyHistory({
            variables: {
              familyHistory: {
                ...formValue,
                patientId: patient.id,
              },
            },
          });
          break;
        default:
          throw new Error('not exisit');
      }
    },
    [activeNav, createFamilyHistory, createMedicineHistory, patient]
  );

  return (
    <>
      <Div display="flex">
        <Div width={200}>
          <CRNav vertical onSelect={setActiveNav}>
            {navs.map((nav, idx) => (
              <CRNav.CRVItem
                eventKey={nav}
                key={idx}
                active={activeNav.value === nav.value}
              >
                {nav.name}
              </CRNav.CRVItem>
            ))}
          </CRNav>
        </Div>
        <Div flexGrow={1} px={4} pb={6}>
          {!noAdd && (
            <NewHistory type={activeNav.value} onCreate={handleCreate} />
          )}
          <Div mt={3}>
            <ListHistory type={activeNav.value} history={history} />
          </Div>
        </Div>
      </Div>
    </>
  );
}

PatientHistory.defaultProps = {};

export default PatientHistory;
