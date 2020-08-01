import React from 'react';
import { Content, Item, Input, Icon } from 'native-base';
import crVariables from '@/utils/cr-variables';

export default ({ field: { name }, form, ...props }) => {
  const touched = form.touched[name];
  const onChangeText = val => form.setFieldValue(name, val, true);
  const onBlur = () => form.setFieldTouched(name, true, true);

  return (
    <Content
      // error={touched && !!form.errors[name]}
      // success={touched && !form.errors[name]}
      marginBottom={crVariables.fieldMarginBottom}
    >
      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
        placeholderTextColor={crVariables.placeholderColor}
      />
      {/* {touched && <Icon name="close-circle" />} */}
    </Content>
  );
};
