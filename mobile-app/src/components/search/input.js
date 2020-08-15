import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Item, Input } from 'native-base';
import crVariables from '@/utils/cr-variables';

const SearchInput = ({ onFocus, onChange }) => {
  return (
    <Item
      style={{
        height: 30,
        paddingHorizontal: 15,
        fontSize: 14,
        flexGrow: 1,
        backgroundColor: crVariables.disabledBgColor,
        borderRadius: crVariables.borderRadius,
      }}
    >
      <Icon
        name="ios-search"
        style={{ fontSize: 15, color: crVariables.placeholderColor }}
      />
      <Input
        bordered={false}
        borderColor="transparent"
        placeholder="Search"
        placeholderTextColor={crVariables.placeholderColor}
        onChangeText={onChange}
        onFocus={onFocus}
        style={{
          height: 30,
          fontSize: 14,
          borderColor: 'transparent',
          paddingLeft: 0,
        }}
      />
    </Item>
  );
};

SearchInput.propTypes = {};

SearchInput.defaultProps = {};

export default SearchInput;
