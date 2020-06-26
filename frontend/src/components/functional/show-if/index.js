import React from 'react';
import PropTypes from 'prop-types';

function ShowIf({ show, children }) {
  if (!show) return null;
  return <>{children}</>;
}

ShowIf.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
ShowIf.defaultProps = {
  show: false,
};

export default ShowIf;
