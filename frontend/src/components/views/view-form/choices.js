import React, { useCallback, useState } from 'react';
import { Input, Icon, Button, IconButton } from 'rsuite';

import { CRModal, Div } from 'components';

function Choices({ visible, onOk, onClose }) {
  const [formValue, setFormValue] = useState([]);
  const handleOnClick = useCallback(() => {
    setFormValue([...formValue, '']);
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

  const handleOnOk = useCallback(() => {
    onOk(formValue);
  }, [formValue, onOk]);

  return (
    <CRModal
      show={visible}
      header="Choices"
      onOk={handleOnOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Div display="flex" justifyContent="flex-end" mb={3}>
        <Button onClick={handleOnClick}>Add</Button>
      </Div>
      {formValue.map((val, index) => (
        <Div display="flex" mb={3} key={index}>
          <Input
            value={val}
            onChange={val => handleOnChange(val, index)}
          ></Input>
          <Div ml={2}>
            <IconButton
              icon={<Icon icon="trash" />}
              color="red"
              onClick={() => handleOnDelete(index)}
            />
          </Div>
        </Div>
      ))}
    </CRModal>
  );
}

export default Choices;
