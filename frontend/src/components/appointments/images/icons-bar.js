import React from 'react';

import { IconStyled } from './style';
import { Div } from 'components';

const IconsBar = ({ editable, disabled, onOk, onEdit, onDelete }) => {
  if (disabled) {
    return null;
  }
  return (
    <Div display="flex" justifyContent="flex-end">
      {editable ? (
        <IconStyled icon="check" onClick={onOk} />
      ) : (
        <IconStyled icon="edit" onClick={onEdit} />
      )}
      <IconStyled icon="trash-o" onClick={onDelete} />
    </Div>
  );
};

IconsBar.defaultProps = {};

export default IconsBar;
