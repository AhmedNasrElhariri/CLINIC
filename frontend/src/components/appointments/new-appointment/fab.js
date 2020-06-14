import React, { useState } from 'react';

import { Div } from 'components';
import { AddOLIcon, ExitOLIcon } from 'components/icons/index';

export default ({ open, setOpen }) => {
  return (
    <Div cursor="pointer">
      {open ? (
        <ExitOLIcon onClick={() => setOpen(false)} />
      ) : (
        <AddOLIcon onClick={() => setOpen(true)} />
      )}
    </Div>
  );
};
