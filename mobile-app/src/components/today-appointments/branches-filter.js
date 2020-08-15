import React, { useState } from 'react';
import { ListItem, Left, Right, CheckBox } from 'native-base';

import { CRText } from '@/components';

const branches = [
  { id: 0, active: false, name: 'All' },
  { id: 1, active: false, name: 'Nasr City' },
  { id: 2, active: true, name: 'Giza' },
];

const BranchFilter = () => {
  const [types, setActive] = useState(branches);

  const onSwitch = idx => {
    const newApptTypes = types.map((p, index) =>
      Object.assign({}, { ...p }, index === idx && { active: !p.active })
    );
    setActive(newApptTypes);
  };

  return (
    <>
      <ListItem itemDivider>
        <CRText size={14} weight="semiBold">
          Branches
        </CRText>
      </ListItem>
      {types.map((p, idx) => (
        <ListItem key={idx} noBorder>
          <Left>
            <CRText size={14}>{p.name}</CRText>
          </Left>
          <Right>
            <CheckBox
              checked={p.active}
              onPress={() => onSwitch(idx)}
              color="#000000"
            />
          </Right>
        </ListItem>
      ))}
    </>
  );
};

export default BranchFilter;
