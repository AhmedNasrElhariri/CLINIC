import React from 'react';
import { View } from 'native-base';
import { CRButton } from '@/components';
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
