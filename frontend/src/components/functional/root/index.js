import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Router } from 'components';
import { GlobalStyle, ContainerStyled, ContentContainerStyled } from './style';
import Sidebar from 'components/layout/sidebar';

const HELLO = gql`
  {
    hello
  }
`;

function App() {
  const { loading, error, data } = useQuery(HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <ContainerStyled>
        <Sidebar></Sidebar>
        <ContentContainerStyled>
          <h1 style={{marginBottom:'50px'}}>{data.hello}</h1>
          <Router></Router>
        </ContentContainerStyled>
      </ContainerStyled>
    </>
  );
}

export default App;
