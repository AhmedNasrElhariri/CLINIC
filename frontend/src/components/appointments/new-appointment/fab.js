import React from 'react';

import { Div } from 'components';
import { PlusIcon } from 'components/icons/index';

export default ({ open, onClick }) => {
  return (
    <Div cursor="pointer" display="inline" >
      {open ? (
        <PlusIcon
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          width={20}
          height={20}
        />
      ) : (
        <PlusIcon
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          width={20}
          height={20}
        />
      )}
    </Div>
  );
};
