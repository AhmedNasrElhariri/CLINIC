import React, { useCallback } from 'react';

import { Icon } from 'rsuite';
import { useHistory } from 'react-router-dom';

import { Div } from 'components';

const Navigator = () => {
  const history = useHistory();

  return (
    <Div display="flex" width={50} justifyContent="space-between">
      <Icon
        icon="angle-left"
        style={{ fontSize: 35, cursor: 'pointer' }}
        onClick={history.goBack}
      />
      <Icon
        icon="angle-right"
        style={{ fontSize: 35, cursor: 'pointer' }}
        onClick={history.goForward}
      />
    </Div>
  );
};

Navigator.propTypes = {};

export default Navigator;
