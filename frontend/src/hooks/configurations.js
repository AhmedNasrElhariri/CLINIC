import { useMemo, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  LIST_CONFIGURATIONS,
  UPDATE_CONFIGURATION,
} from 'apollo-client/queries';

const useConfigurations = ({ onUpdate } = {}) => {
  const { data } = useQuery(LIST_CONFIGURATIONS);
  const configurations = useMemo(() => R.propOr({}, 'configuration')(data), [
    data,
  ]);
  const sessions = useMemo(() => R.propOr([], 'sessions')(configurations), [
    configurations,
  ]);

  const [updateConfiguration] = useMutation(UPDATE_CONFIGURATION, {
    onCompleted: () => {
      Alert.success('Event has been updated successfully');
      onUpdate && onUpdate();
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
    }),
    [configurations, handleUpdateConfiguration, sessions]
  );
};

export default useConfigurations;
