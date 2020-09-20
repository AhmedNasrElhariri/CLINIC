import React, { useState } from 'react';

import { CRButton, Div } from 'components';
import AddLabDocs from './add-lab-docs';
import ListLabDocs from './list-lab-docs';
import useFetchLabDocs from 'hooks/fetch-lab-docs';

const PatientLabs = ({ patient, noAdd = false }) => {
  const [visible, setVisible] = useState(false);
  const { labDocs, updateCache } = useFetchLabDocs(patient);

  return (
    <Div px={3}>
      {!noAdd && (
        <Div textAlign="right" mb={4}>
          <CRButton onClick={() => setVisible(true)} small primary>
            Add
          </CRButton>
        </Div>
      )}
      <AddLabDocs
        show={visible}
        onCancel={() => setVisible(false)}
        onAdded={newDoc => {
          setVisible(false);
          updateCache([newDoc, ...labDocs]);
        }}
        patient={patient}
      />
      <ListLabDocs labDocs={labDocs} />
    </Div>
  );
};

PatientLabs.propTypes = {};

export default PatientLabs;
