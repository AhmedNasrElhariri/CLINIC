import React from 'react';
import { Picker, Icon, View } from 'native-base';

import crVariables from '@/utils/cr-variables';

export default ({
  field: { name, onBlur, value },
  form,
  choices = [],
  placeholder,
  labelKey = 'label',
  valueKey = 'value',
  containerStyle,
  ...props
}) => {
  const onValueChange = val => {
    form.setFieldValue(name, val);
  };
  return (
    <View
      style={{
        borderWidth: crVariables.borderWidth,
        borderColor: crVariables.borderColor,
        borderRadius: crVariables.borderRadius,
        marginBottom: crVariables.fieldMarginBottom,
        paddingLeft: crVariables.fieldPaddingLeft - 5,
        paddingRight: crVariables.fieldPaddingRight - 5,
        flexGrow: 1,
        ...containerStyle,
      }}
    >
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        name={name}
        selectedValue={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        onBlur={onBlur}
        {...props}
      >
        {<Picker.Item label={placeholder} value={undefined} enabled={false} />}
        {choices.map(({ [labelKey]: label, [valueKey]: value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};
