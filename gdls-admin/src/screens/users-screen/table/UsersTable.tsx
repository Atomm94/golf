import React from 'react';
import { css } from 'emotion';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { UsersTableHeader } from './UsersTableHeader';
import { IUser, UsersTableRow } from './UsersTableRow';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';

const containerStyle = css`
  width: calc(100vw - 200px);
  overflow-x: scroll;
  @media(max-width: 800px) {
    width: 100%;
  }
`;

const contentStyle = css`
  min-width: 650px;
`;

const GET_USERS_QUERY = gql`
  query GET_USERS {
    users {
      id
      firstName
      lastName
      handicap
      money
      description
      location
      email
      phone
    }
  }
`;

export const UsersTable = () => {
  const { data, loading } = useQuery(GET_USERS_QUERY, { fetchPolicy: 'network-only' });
  if (loading) {
    return (
      <CircularProgress />
    );
  }
  return (
    <Paper className={containerStyle}>
      <Table className={contentStyle} aria-label="simple table">
        <UsersTableHeader />
        <TableBody>
          {data.users.map((user: IUser) => <UsersTableRow key={user.id} data={user} />)}
        </TableBody>
      </Table>
    </Paper>
  );
};
