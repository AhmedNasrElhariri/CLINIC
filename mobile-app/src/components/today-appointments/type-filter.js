import React, { useCallback } from 'react';
import { ListItem, Left, Right, CheckBox, Radio } from 'native-base';
import * as R from 'ramda';

import { CRText } from '@/components';

const types = ['All', 'Examination', 'Followup', 'Session', 'Urgent'];

const TypeFilter = ({ filter, onChange }) => {
  const isActive = useCallback(type => filter.includes(type), [filter]);

  const onSwitch = useCallback(
    type => {
      const newFilter = filter.includes(type)
        ? R.without([type])(filter)
        : filter.concat([type]);

      onChange(newFilter);
    },
    [onChange, filter]
  );

  return (
    <>
      <ListItem itemDivider>
        <CRText size={14} weight="semiBold">
          Appointment Type
        </CRText>
      </ListItem>
      {types.map((t, idx) => (
        <ListItem key={idx} noBorder>
          <Left>
            <CRText size={14}>{t}</CRText>
          </Left>
          <Right>
            <CheckBox
              checked={isActive(t)}
              onPress={() => onSwitch(t)}
              color="#000000"
            />
          </Right>
        </ListItem>
      ))}
    </>
  );
};

export default TypeFilter;
