import React from 'react';

import { Div } from 'components';
import { AddOLIcon, ExitOLIcon } from 'components/icons/index';

export default ({ open, onClick }) => {
  return (
    <Div cursor="pointer" display="inline">
      {open ? (
        <ExitOLIcon
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          width={35}
        />
      ) : (
        <AddOLIcon
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
          width={35}
        />
      )}
    </Div>
  );
};
