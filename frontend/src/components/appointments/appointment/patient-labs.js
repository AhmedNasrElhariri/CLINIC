import React, { useState } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';

import { CRButton } from 'components';
import AddLabDocs from './add-lab-docs';
import ListLabDocs from './list-lab-docs';
import { LIST_PATIENT_LABS } from 'apollo-client/queries';

const PatientLabs = ({ patient, noAdd = false }) => {
  const [visible, setVisible] = useState(false);
  const { data } = useQuery(LIST_PATIENT_LABS, {
    variables: {
      patientId: patient.id,
    },
    onCompleted: () => {
      // Alert.success('Lab Document has been uploaded successfully');
    },
  });

  const labDocs = R.propOr([], 'patientLabs')(data);
  return (
    <>
      {!noAdd && (
        <div>
          <CRButton onClick={() => setVisible(true)}>Add</CRButton>
        </div>
      )}
      <AddLabDocs
        show={visible}
        onCancel={() => setVisible(false)}
        patient={patient}
      />
      <ListLabDocs labDocs={labDocs} />
    </>
  );
};

PatientLabs.propTypes = {};

export default PatientLabs;
