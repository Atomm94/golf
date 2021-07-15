import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { MainRouter } from './MainRouter';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  credentials: 'include',
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
