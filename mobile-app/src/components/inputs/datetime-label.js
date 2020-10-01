import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';

import crVariables from '@/utils/cr-variables';

const DateTimeLabel = ({ placeholder, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: crVariables.borderWidth,
          borderColor: crVariables.borderColor,
          borderRadius: crVariables.borderRadius,
          marginBottom: crVariables.fieldMarginBottom,
          paddingLeft: crVariables.fieldPaddingLeft,
          paddingRight: crVariables.fieldPaddingRight,
          height: crVariables.fieldHeight,
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Text>{placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateTimeLabel;
