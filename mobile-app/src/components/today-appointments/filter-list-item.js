import React from 'react';
import { ListItem, Left, Right, CheckBox } from 'native-base';
import CRText from '../text/index';

const FilterListItem = ({ name, onPress, isActive }) => {
  return (
    <ListItem noBorder onPress={onPress}>
      <Left>
        <CRText size={14}>{name}</CRText>
      </Left>
      <Right>
        <CheckBox onPress={onPress} checked={isActive} color="#000000" />
      </Right>
    </ListItem>
  );
};

export default FilterListItem;
