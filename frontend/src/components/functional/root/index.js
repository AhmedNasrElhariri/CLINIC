import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { LIST_VIEW } from 'apollo-client/queries';
import * as R from 'ramda';

import { AppRouter, Login } from 'components';
import {
  GlobalStyle,
  ContainerStyled,
  ContentContainerStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import useAuth from 'hooks/auth';
import useGlobalState from 'state';
import { mapGroupFieldsToLanes } from 'utils/view';

function Root() {
  const [getView, { data }] = useLazyQuery(LIST_VIEW);
  const { isVerified, isAuthenticated } = useAuth();

  const [_, setLanes] = useGlobalState('lanes');

  useEffect(() => {
    if (isVerified && isAuthenticated) {
      getView();
    }
  }, [data, getView, isAuthenticated, isVerified, setLanes]);

  useEffect(() => {
    const serverData = R.prop('listView')(data);
    if (serverData) {
      setLanes(mapGroupFieldsToLanes(serverData));
    }
  }, [data, setLanes]);

  if (!isVerified) {
    return <div>Loading ...</div>;
  }

  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <ContainerStyled>
        {isAuthenticated ? (
          <>
            <Sidebar></Sidebar>
            <ContentContainerStyled>
              <AppRouter></AppRouter>
            </ContentContainerStyled>
          </>
        ) : (
          <>
            <Route path="/login">
              <LoginContainerStyled>
                <Login />
              </LoginContainerStyled>
            </Route>
            <Redirect to="/login"></Redirect>
          </>
        )}
      </ContainerStyled>
    </BrowserRouter>
  );
}

export default Root;
