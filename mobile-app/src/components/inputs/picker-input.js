import React from 'react';
import { Picker, Icon } from 'native-base';

export default ({
  field: { name, onBlur, value },
  form,
  choices = [],
  placeholder,
  labelKey = 'label',
  valueKey = 'value',
  ...props
}) => {
  const onValueChange = val => {
    form.setFieldValue(name, val);
  };
  return (
    <Picker
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
    </Picker>
  );
};
