import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from 'hooks/auth';

const ProtectedRoute = ({ component: Component, action, subject, ...rest }) => {
  const { can } = useAuth();
  const isAuthenticated = React.useMemo(() => can(action, subject), [
    action,
    can,
    subject,
  ]);

  console.log('inside', isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default React.memo(ProtectedRoute);
