import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo-client';
import 'rsuite/dist/styles/rsuite-default.css';

import { Root } from 'components';
import './state';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
}
