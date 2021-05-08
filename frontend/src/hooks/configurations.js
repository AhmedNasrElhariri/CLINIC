import { useMemo, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  LIST_CONFIGURATIONS,
  UPDATE_CONFIGURATION,
  ADD_PULSES_CONTROL,
  GET_PULSE_CONTROL,
} from 'apollo-client/queries';

const useConfigurations = ({ onUpdate } = {}) => {
  const { data } = useQuery(LIST_CONFIGURATIONS, {
    fetchPolicy: 'network-only',
  });
  const configurations = useMemo(() => R.propOr({}, 'configuration')(data), [
    data,
  ]);
  const sessions = useMemo(() => R.propOr([], 'sessions')(configurations), [
    configurations,
  ]);

  const { data: PulseData } = useQuery(GET_PULSE_CONTROL, {
    fetchPolicy: 'network-only',
  });
  const getPulseControl = useMemo(
    () => R.propOr({}, 'getPulseControl')(PulseData),
    [PulseData]
  );
  const [updateConfiguration] = useMutation(UPDATE_CONFIGURATION, {
    onCompleted: () => {
      Alert.success('Event has been updated successfully');
      onUpdate && onUpdate();
    },
  });
  const [addPulsesControl] = useMutation(ADD_PULSES_CONTROL, {
    onCompleted: () => {
      Alert.success('Pulses Contol Added successfully');
    },
  });
  const handleUpdateConfiguration = useCallback(
    configuration => updateConfiguration({ variables: { configuration } }),
    [updateConfiguration]
  );

  return useMemo(
    () => ({
      configurations,
      sessions,
      update: handleUpdateConfiguration,
      addPulsesControl,
      getPulseControl,
    }),
    [
      configurations,
      handleUpdateConfiguration,
      sessions,
      addPulsesControl,
      getPulseControl,
    ]
  );
};

export default useConfigurations;
