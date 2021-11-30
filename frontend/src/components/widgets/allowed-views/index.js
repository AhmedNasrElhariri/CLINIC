import React, { useContext } from 'react';
import UserAllowedViewsContext from '../../../services/allowed-views-context';
const AllowedViews = ({ children, part }) => {
  const allowedViewsList = useContext(UserAllowedViewsContext);
  let exist = false;
  if (allowedViewsList?.includes(part)) {
    exist = true;
  }
  return <>{exist && <div>{children}</div>}</>;
};

export default AllowedViews;
