import React, { useCallback } from 'react';
import { ListItem } from 'native-base';

import { CRText } from '@/components';
import FilterListItem from './filter-list-item';

const PropFilter = ({ name, filter, list, onSwitch, onSwitchAll }) => {
  const isActive = useCallback(type => filter.includes(type), [filter]);

  return (
    <>
      <ListItem itemDivider>
        <CRText size={14} weight="semiBold">
          {name}
        </CRText>
      </ListItem>
      <FilterListItem
        name="All"
        isActive={filter.length === list.length}
        onPress={onSwitchAll}
      />
      {list.map((t, idx) => (
        <FilterListItem
          key={idx}
          name={t}
          isActive={isActive(t)}
          onPress={() => onSwitch(t)}
        />
      ))}
    </>
  );
};

export default PropFilter;
