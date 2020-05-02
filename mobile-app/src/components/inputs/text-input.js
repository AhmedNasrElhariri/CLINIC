import React from 'react';
import { Item, Input, Icon } from 'native-base';

export default ({ field: { name }, form, ...props }) => {
  const touched = form.touched[name];
  const onChangeText = val => form.setFieldValue(name, val, true);
  const onBlur = () => form.setFieldTouched(name, true, true);

  return (
    <Item
      error={touched && !!form.errors[name]}
      success={touched && !form.errors[name]}>
      <Input onChangeText={onChangeText} onBlur={onBlur} {...props} />
      {touched && <Icon name='close-circle' />}
    </Item>
  );
};
