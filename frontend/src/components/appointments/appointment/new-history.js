import React, { useState, memo } from 'react';
import { CRModal, Div } from 'components';
import { CRButton } from 'components';

import NewMedicalHistory from './new-medical-history';
import NewFamilyHistory from './new-family-history';
import { MEDICAL_HISTORY_TYPES } from 'utils/constants';

const titles = Object.entries(MEDICAL_HISTORY_TYPES).reduce(
  (obj, [key, val]) => ({
    ...obj,
    [val]: `New ${val} History`,
  }),
  {}
);

const HistoryForm = memo(({ type, ...props }) => (
  <>
    {type === MEDICAL_HISTORY_TYPES.medical ? (
      <NewMedicalHistory {...props} />
    ) : type === MEDICAL_HISTORY_TYPES.family ? (
      <NewFamilyHistory {...props} />
    ) : null}
  </>
));

function NewHistory({ onCreate, type }) {
  const [formValue, setFormValue] = useState();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Div textAlign="right">
        <CRButton onClick={() => setVisible(true)} small primary>
          Add
        </CRButton>
      </Div>
      <CRModal
        show={visible}
        header={titles[type]}
        okTitle="Create"
        onOk={() => {
          onCreate(formValue);
          setVisible(false);
        }}
        onHide={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <HistoryForm type={type} onChange={setFormValue} />
      </CRModal>
    </>
  );
}

NewHistory.propTypes = {};

export default memo(NewHistory);
