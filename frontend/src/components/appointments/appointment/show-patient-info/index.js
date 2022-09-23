import React, { useMemo } from 'react';
import { CRModal, Div } from 'components';
import { useQuery } from '@apollo/client';
import usePatientHistory from 'components/patients/patient/use-patient-history';
import { GET_PATIENT_FIELD } from 'apollo-client/queries';
import * as R from 'ramda';
import { getKeyValuesFromPatientGroups } from 'services/appointment';
const PatientInfo = ({ visible, onClose, patient }) => {
  const { data: patientFieldData } = useQuery(GET_PATIENT_FIELD, {
    variables: {
      patientId: patient.id,
    },
  });
  const fields = useMemo(
    () => R.propOr([], 'getPatientField')(patientFieldData),
    [patientFieldData]
  );
  const { patientGroups, normalizedPatientFields } = usePatientHistory({
    patientId: patient?.id,
    appointment: { data: fields },
  });
  const data = getKeyValuesFromPatientGroups(
    patientGroups,
    normalizedPatientFields
  );
  return (
    <CRModal
      show={visible}
      header="Patient Info"
      onHide={onClose}
      onCancel={onClose}
      noFooter={true}
      CancelFooter={true}
    >
      <Div width="250px" height="250px">
        <Div display="flex" p="10px">
          <Div width="50px" ml="30px" mr="30px">
            Name
          </Div>
          <Div>{patient?.name}</Div>
        </Div>
        <Div display="flex" p="10px">
          <Div width="50px" ml="30px" mr="30px">
            Phone
          </Div>
          <Div>{patient?.phoneNo}</Div>
        </Div>
        <Div display="flex" p="10px">
          <Div width="50px" ml="30px" mr="30px">
            Sex
          </Div>
          <Div>{patient?.sex}</Div>
        </Div>
        {data &&
          data.length > 0 &&
          data.map(d => (
            <Div display="flex" p="10px">
              <Div width="50px" ml="30px" mr="30px">
                {d?.name}
              </Div>
              <Div>{d?.value}</Div>
            </Div>
          ))}
      </Div>
    </CRModal>
  );
};
export default PatientInfo;
