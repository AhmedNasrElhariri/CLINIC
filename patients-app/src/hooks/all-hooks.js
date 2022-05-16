import React, { useMemo } from "react";
import {
  LIST_SEARCHED_PATIENTS,
  LIST_PATIENT_COURSES,
  LIST_SESSIONS_DEFINITION,
  APPOINTMENTS_DAY_COUNT,
  CREATE_APPOINTMENT,
} from "../apollo-client/queries";
import { useQuery, useMutation } from "@apollo/client";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import { Message, toaster } from "rsuite";

const AllHooks = ({
  patientSearchValue,
  organizationId,
  patientId,
  date,
  userId,
  onCreate,
}) => {
  const { t } = useTranslation();
  const { data: searchedPatientsData } = useQuery(LIST_SEARCHED_PATIENTS, {
    variables: {
      name: patientSearchValue,
      organizationId: organizationId,
    },
  });
  const searchedPatients = useMemo(
    () => R.propOr([], "searchedPatients")(searchedPatientsData),
    [searchedPatientsData]
  );

  const { data: patientData } = useQuery(LIST_PATIENT_COURSES, {
    variables: { patientId },
  });
  const patientCourses = useMemo(
    () => R.propOr([], "myPatientCourses")(patientData),
    [patientData]
  );

  const { data: sessionsDefinitionsData } = useQuery(LIST_SESSIONS_DEFINITION, {
    variables: {
      organizationId: organizationId,
    },
  });
  const sessionsDefinition = useMemo(
    () => R.propOr([], "mySessionsDefinition")(sessionsDefinitionsData),
    [sessionsDefinitionsData]
  );

  const { data: appointmentsDay } = useQuery(APPOINTMENTS_DAY_COUNT, {
    variables: {
      date: date,
      userId: userId,
    },
  });
  const appointmentsCount = useMemo(
    () => R.propOr({}, "appointmentsDayCount")(appointmentsDay),
    [date, appointmentsDay]
  );

  const [createAppointment, { loading }] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      onCreate && onCreate();
      toaster.push(
        <Message showIcon type="success" header="Success">
          {t("CREATE_APPOINTMENT_MESSAGE")}
        </Message>
      );
    },
    onError: ({ message }) =>
      toaster.push(
        <Message showIcon type="error" header="Error">
          {message}
        </Message>
      ),
  });

  return useMemo(
    () => ({
      searchedPatients,
      patientCourses,
      sessionsDefinition,
      appointmentsCount,
      createAppointment: (appointment) =>
        createAppointment({ variables: { appointment } }),
      loading,
    }),
    [
      searchedPatients,
      patientCourses,
      sessionsDefinition,
      appointmentsCount,
      createAppointment,
      loading,
    ]
  );
};

export default AllHooks;
