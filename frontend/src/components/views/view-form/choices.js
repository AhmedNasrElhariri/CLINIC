import React, { useCallback, useState } from 'react';
import { Input, Icon, Button, IconButton, Toggle, Form } from 'rsuite';

import { CRModal, CRSelectInput, Div } from 'components';

function Choices({
  visible,
  onOk,
  onClose,
  toggle,
  setToggle,
  choicesTypes,
  choicesType,
  setChoicesType,
}) {
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
      <Div mr={20} mt={45} width={100}>
        <Toggle
          checkedChildren="static"
          unCheckedChildren="dynamic"
          size="md"
          onChange={v => setToggle(v)}
          mt={10}
        />
      </Div>
      {toggle && (
        <>
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
        </>
      )}
      {!toggle && (
        <Form formValue={choicesType} onChange={setChoicesType}>
          
            <CRSelectInput data={choicesTypes} name="choicesType" style={{width:'300px',marginTop:'10px'}} />
          
        </Form>
      )}
    </CRModal>
  );
}

export default Choices;
