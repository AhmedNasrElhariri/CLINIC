import { useMemo, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  LIST_CONFIGURATIONS,
  UPDATE_CONFIGURATION,
  ADD_PULSES_CONTROL,
  GET_PULSE_CONTROL,
  ADD_PAGE_SETUP,
  GET_PAGE_SETUP,
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

  const { data: pageSetup } = useQuery(GET_PAGE_SETUP);
  const pageSetupData = useMemo(
    () => R.propOr({}, 'getPageSetup')(pageSetup),
    [pageSetup]
  );

  console.log(pageSetupData,'papase');
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

  const [addPageSetup] = useMutation(ADD_PAGE_SETUP, {
    onCompleted: () => {
      Alert.success('Page Setup updated successfully');
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
      addPageSetup,
      pageSetupData
    }),
    [
      configurations,
      handleUpdateConfiguration,
      sessions,
      addPulsesControl,
      getPulseControl,
      addPageSetup,
      pageSetupData
    ]
  );
};

export default useConfigurations;
