import React from 'react';

import { Icon } from 'rsuite';
import { useHistory } from 'react-router-dom';

import { Div } from 'components';

const Navigator = () => {
  const history = useHistory();

  return (
    <div style={{ direction: 'ltr' }}>
      <Div display="flex" width={50} justifyContent="space-between">
        <Icon
          icon="angle-left"
          style={{ fontSize: 35, cursor: 'pointer', color: '#575757' }}
          onClick={history.goBack}
        />
        <Icon
          icon="angle-right"
          style={{ fontSize: 35, cursor: 'pointer', color: '#575757' }}
          onClick={history.goForward}
        />
      </Div>
    </div>
  );
};

Navigator.propTypes = {};

export default Navigator;
