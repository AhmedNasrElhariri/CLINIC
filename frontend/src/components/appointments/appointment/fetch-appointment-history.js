import { useMemo } from 'react';
import * as R from 'ramda';

import { normalizeFieldsOfGroups } from 'services/appointment';

import useGlobalState from 'state';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENT_HISTORY } from 'apollo-client/queries';

export default ({ appointmentId, appointment }) => {
  if (!appointmentId || !appointment) {
    return {
      normalizedFields: {},
      appointmentHistory: [],
      viewFields: [],
      groups: [],
    };
  }

  const [views] = useGlobalState('activeViews');
  console.log(views,'groupsViews');
  const view = useMemo(() => views[appointment.type], [appointment, views]);
  const { data: history } = useQuery(GET_APPOINTMENT_HISTORY, {
    variables: {
      appointmentId,
    },
  });
  const groups = useMemo(() => R.propOr([], 'fieldGroups')(view), [view]);
  const viewFields = useMemo(
    () => R.pipe(R.map(R.prop('fields')), R.unnest)(groups),
    [groups]
  );
  const appointmentHistory = useMemo(
    () => R.pathOr([], ['appointmentHistory'])(history),
    [history]
  );
  const data = useMemo(() => R.propOr([], 'data')(appointment), [appointment]);
  const normalizedFields = useMemo(
    () => normalizeFieldsOfGroups(groups, data),
    [data, groups]
  );

  return {
    normalizedFields,
    appointmentHistory,
    viewFields,
    groups,
  };
};
