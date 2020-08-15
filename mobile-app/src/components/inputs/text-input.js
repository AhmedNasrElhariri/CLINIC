import React from 'react';
import { Content, Item, Input, Icon } from 'native-base';
import crVariables from '@/utils/cr-variables';

export default ({ field: { name }, form, ...props }) => {
  const onChangeText = val => form.setFieldValue(name, val, true);
  const onBlur = () => form.setFieldTouched(name, true, true);

  return (
    <Content marginBottom={crVariables.fieldMarginBottom}>
      <Input
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
        placeholderTextColor={crVariables.placeholderColor}
      />
    </Content>
  );
};
