import { useMemo, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as R from "ramda";
import { Alert } from "rsuite";

import {
  LIST_CONFIGURATIONS,
  UPDATE_CONFIGURATION,
  ADD_PULSES_CONTROL,
  GET_PULSE_CONTROL,
  ADD_PAGE_SETUP,
  GET_PAGE_SETUP,
  EDIT_POINTS,
  GET_POINTS,
  UPDATE_SMS_CONF,
  EDIT_FOLLOWUP_FEATURE,
  GET_INVOICE_COUNTER,
} from "apollo-client/queries";

const useConfigurations = ({ onUpdate } = {}) => {
  const { data } = useQuery(LIST_CONFIGURATIONS, {
    fetchPolicy: "network-only",
  });
  const configurations = useMemo(
    () => R.propOr({}, "configuration")(data),
    [data]
  );
  // const { data: PulseData } = useQuery(GET_PULSE_CONTROL, {
  //   fetchPolicy: 'network-only',
  // });
  // const getPulseControl = useMemo(
  //   () => R.propOr({}, 'getPulseControl')(PulseData),
  //   [PulseData]
  // );

  const { data: pageSetup } = useQuery(GET_PAGE_SETUP);
  const pageSetupData = useMemo(
    () => R.propOr([], "getPageSetup")(pageSetup),
    [pageSetup]
  );
  const { data: pointsData } = useQuery(GET_POINTS);
  const points = useMemo(
    () => R.propOr({}, "points")(pointsData),
    [pointsData]
  );
  const { data: organizationData } = useQuery(GET_INVOICE_COUNTER, {
    fetchPolicy: "network-only",
  });
  const organization = useMemo(
    () => R.propOr({}, "myInvoiceCounter")(organizationData),
    [organizationData]
  );
  const [updateConfiguration] = useMutation(UPDATE_CONFIGURATION, {
    onCompleted: () => {
      Alert.success("Event has been updated successfully");
      onUpdate && onUpdate();
    },
  });
  const [addPulsesControl] = useMutation(ADD_PULSES_CONTROL, {
    onCompleted: () => {
      Alert.success("Pulses Contol Added successfully");
    },
  });

  const [addPageSetup] = useMutation(ADD_PAGE_SETUP, {
    onCompleted: () => {
      Alert.success("Page Setup updated successfully");
    },
    refetchQueries: [
      {
        query: GET_PAGE_SETUP,
      },
    ],
  });
  const [editPoints] = useMutation(EDIT_POINTS, {
    onCompleted: () => {
      Alert.success("Points updated successfully");
    },
  });
  const [editFollowUpFeature] = useMutation(EDIT_FOLLOWUP_FEATURE, {
    onCompleted: () => {
      Alert.success("Followup Feature updated successfully");
    },
  });

  const handleUpdateConfiguration = useCallback(
    (configuration) => updateConfiguration({ variables: { configuration } }),
    [updateConfiguration]
  );

  const [updateSMSConf] = useMutation(UPDATE_SMS_CONF, {
    onCompleted: () => {
      Alert.success("SMS Configuration has been updated successfully");
      onUpdate && onUpdate();
    },
    refetchQueries: [
      {
        query: LIST_CONFIGURATIONS,
      },
    ],
  });

  return useMemo(
    () => ({
      configurations,
      update: handleUpdateConfiguration,
      addPulsesControl,
      // getPulseControl,
      addPageSetup,
      pageSetupData,
      editPoints,
      points,
      updateSMSConf,
      editFollowUpFeature,
      organization,
    }),
    [
      configurations,
      handleUpdateConfiguration,
      addPulsesControl,
      // getPulseControl,
      addPageSetup,
      pageSetupData,
      editPoints,
      points,
      updateSMSConf,
      editFollowUpFeature,
      organization,
    ]
  );
};

export default useConfigurations;
