import React, { useState, useCallback } from 'react';
import { Picker, Icon, Text, List, ListItem, Input } from 'native-base';
import { Modal } from 'react-native';

export default ({
  field: { name, onBlur, value },
  form,
  choices = [],
  placeholder,
  labelKey = 'label',
  valueKey = 'value',
  ...props
}) => {
  const [innerValue, setinnerValue] = useState(null);
  const [visible, setModalVisibility] = useState(false);

  const openModal = useCallback(() => setModalVisibility(true), []);
  const closeModal = useCallback(() => setModalVisibility(false), []);

  const onValueChange = val => {
    form.setFieldValue(name, val);
  };

  return (
    <>
      <Text onPress={openModal}>{setinnerValue || placeholder}</Text>
      <Modal
        visible={visible}
        onSwipeComplete={closeModal}
        swipeDirection={['left']}
        onBackButtonPress={closeModal}>
        <Input></Input>
        {/* <List>
          {choices.map(({ [labelKey]: label, [valueKey]: value }) => (
            <ListItem key={value} value={value}>
              <Text>{label}</Text>
            </ListItem>
          ))}
        </List> */}
      </Modal>
      {/* <Picker
        mode='dropdown'
        iosIcon={<Icon name='arrow-down' />}
        name={name}
        selectedValue={value}
        onValueChange={onValueChange}
        onBlur={onBlur}
        {...props}>
        {<Picker.Item label={placeholder} value={undefined} enabled={false} />}
        {choices.map(({ [labelKey]: label, [valueKey]: value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker> */}
    </>
  );
};
