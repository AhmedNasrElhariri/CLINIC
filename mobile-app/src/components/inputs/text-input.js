import React from 'react';
import { Content, Input } from 'native-base';
import crVariables from '@/utils/cr-variables';
import ErrorText from './error-text';

export default ({ field: { name }, form, ...props }) => {
  const onChangeText = val => form.setFieldValue(name, val, true);
  const onBlur = () => form.setFieldTouched(name, true, true);

console.log(form)

  return (
    <Content marginBottom={crVariables.fieldMarginBottom}>
      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
        placeholderTextColor={crVariables.placeholderColor}
      />
      <ErrorText>{form.errors[name]}</ErrorText>
    </Content>
  );
};
