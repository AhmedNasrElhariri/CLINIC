import React, { useCallback, useMemo, useState } from 'react';
import { Input, Icon } from 'rsuite';

import { CRModal, CRButton } from 'components';

function NewValues({ type, visible, onOk, onClose, onChange }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Values' : 'Edit Values '),
    [type]
  );
  const [formValue, setFormValue] = useState([]);
  const handleOnClick = useCallback(() => {
    setFormValue([...formValue, null]);
  }, [formValue]);

  const handleOnDelete = useCallback(
    indx => {
      let formVal2 = formValue.filter((item, index) => index !== indx);
      setFormValue(formVal2);
    },
    [formValue]
  );

  const handleOnChange = useCallback(
    (newVal, index) => {
      const newValue = formValue.map((oldVal, indx) =>
        index === indx ? newVal : oldVal
      );
      setFormValue(newValue);
    },
    [formValue]
  );
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <CRButton
        primary
        small
        block
        style={{ float: 'left', width: '20%' }}
        onClick={handleOnClick}
      >
        ADD
      </CRButton>
      {formValue.map((val, index) => (
        <>
          <Input
            key={index}
            value={val}
            style={{ display: 'inline', width: '90%', margin: '5px' }}
            onChange={val => handleOnChange(val, index)}
          ></Input>
          <Icon
            icon="trash"
            size="2x"
            style={{
              color: '#f44336',
              float: 'right',
              padding: '7px',
            }}
            onClick={() => handleOnDelete(index)}
          ></Icon>
        </>
      ))}
    </CRModal>
  );
}

NewValues.defaultProps = {
  type: 'create',
};

export default NewValues;
