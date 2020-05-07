import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { AppRouter, Login } from 'components';
import {
  GlobalStyle,
  ContainerStyled,
  ContentContainerStyled,
  LoginContainerStyled,
} from './style';
import Sidebar from 'components/layout/sidebar';
import useAuth from 'hooks/auth';

function Root() {
  const { isVerified, isAuthenticated } = useAuth();

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
