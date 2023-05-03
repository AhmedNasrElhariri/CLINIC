import { useMemo } from 'react';
import * as R from 'ramda';

import {
  normalizeFieldsOfGroups,
  normalizeDataWithGroups,
} from 'services/appointment';

import useGlobalState from 'state';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENT_HISTORY } from 'apollo-client/queries';
import { NUMBER_FIELD_TYPE, TEXT_FIELD_TYPE } from 'utils/constants';

const usePatientHistory = ({ patientId, appointment = {}, type }) => {
  const views = useGlobalState('activeViews');
  const { data: history } = useQuery(GET_APPOINTMENT_HISTORY, {
    variables: {
      patientId,
      type,
    },
    fetchPolicy: 'cache-and-network',
  });
  const View = views[0]['Examination'];
  const groups = useMemo(() => R.propOr([], 'fieldGroups')(View), [View]);

  const viewFields = useMemo(
    () => R.pipe(R.map(R.prop('fields')), R.unnest)(groups),
    [groups]
  );

  const appointmentHistory = useMemo(
    () => R.pathOr([], ['appointmentHistory'])(history),
    [history]
  );

  const patientViews = useGlobalState('activePatientViews');
  const patientGroups = useMemo(
    () => R.propOr([], 'fieldGroups')(patientViews[0]['0']),
    [patientViews]
  );
  const patientViewFields = useMemo(
    () => R.pipe(R.map(R.prop('fields')), R.unnest)(patientGroups),
    [patientGroups]
  );
  const data = useMemo(() => R.propOr([], 'data')(appointment), [appointment]);

  const normalizedFields = useMemo(
    () => normalizeFieldsOfGroups(groups, data),
    [data, groups]
  );
  const normalizedPatientFields = useMemo(
    () => normalizeFieldsOfGroups(patientGroups, data),
    [data, patientGroups]
  );
  const tabularFields = useMemo(() => {
    return viewFields.filter(
      f => f.type === NUMBER_FIELD_TYPE || f.type === TEXT_FIELD_TYPE
    );
  }, [viewFields]);

  const tabularFieldsIds = useMemo(() => {
    return R.map(R.prop('id'))(tabularFields);
  }, [tabularFields]);

  const pickTabularFields = useMemo(
    () => (val, key) => tabularFieldsIds.includes(val.field.id),
    [tabularFieldsIds]
  );
  const tabularData = useMemo(
    () =>
      R.pipe(
        R.map(R.propOr([], 'data')),
        R.map(d => {
          const pickedFields = R.pickBy(pickTabularFields)(d);
          return Object.values(pickedFields).reduce(
            (obj, val) => Object.assign(obj, { [val.field.id]: val.value }),
            {}
          );
        }),
        R.filter(R.pipe(R.isEmpty, R.not))
      )(appointmentHistory),
    [appointmentHistory, pickTabularFields]
  );

  const normalizedAppointments = useMemo(
    () =>
      appointmentHistory.map(({ data, ...rest }) => {
        const pickedFields = R.pickBy(pickTabularFields)(data);
        const newData = Object.values(pickedFields).reduce(
          (obj, val) => Object.assign(obj, { [val.field.id]: val.value }),
          {}
        );
        return {
          ...rest,
          data: newData,
        };
      }),
    [appointmentHistory, pickTabularFields]
  );

  const appointmentsWithGroups = useMemo(
    () =>
      appointmentHistory.map(app => ({
        ...app,
        data: normalizeDataWithGroups(groups, app.data),
      })),
    [appointmentHistory, groups]
  );

  if (!patientId) {
    return {
      normalizedFields: {},
      appointmentHistory: [],
      viewFields: [],
      groups: [],
    };
  }

  return {
    normalizedFields,
    appointmentHistory,
    viewFields,
    groups,
    patientGroups,
    patientViewFields,
    normalizedPatientFields,
    tabularFields,
    tabularData,
    normalizedAppointments,
    appointmentsWithGroups,
  };
};

export default usePatientHistory;
