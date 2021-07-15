import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { css } from 'emotion';

import { LoginScreen } from './screens/login-screen/LoginScreen';
import { UsersScreen } from './screens/users-screen/UsersScreen';
import { TopBar } from './components/TopBar';
import { RoundsScreen } from './screens/rounds-screen/RoundsScreen';

import { getToken } from './services/get-token';

const containerStyle = css`
  min-height: 100vh;
`;

export const MainRouter = () => {
  return (
    <div className={containerStyle}>
      <TopBar />
      {!getToken() && <Redirect to="/login" />}
      <Route exact path="/" component={UsersScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/rounds" component={RoundsScreen} />
    </div>
  );
};
