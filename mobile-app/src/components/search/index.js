import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Item, Input, View } from 'native-base';
import crVariables from '@/utils/cr-variables';
import { CRText } from '@/components';
import SearchInput from './input';

const Search = ({ onChange, onClose }) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingVertical: 20,
        }}
      >
        <SearchInput onChange={onChange} />
        <View style={{ marginLeft: 10 }}>
          <CRText onPress={onClose}>Cancel</CRText>
        </View>
      </View>
    </>
  );
};

Search.propTypes = {};

export default Search;
