import React from 'react';
import { View } from 'native-base';
import SearchInput from './input';
import CRButton from '../buttons/index';

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
          <CRButton onPress={onClose} transparent size={14}>
            Cancel
          </CRButton>
        </View>
      </View>
    </>
  );
};

Search.propTypes = {};

export default Search;
