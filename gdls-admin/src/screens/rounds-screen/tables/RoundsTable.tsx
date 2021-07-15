import React from 'react';
import { css } from 'emotion';
import { Table, TableBody, Paper } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { observer } from 'mobx-react';

import { RoundsTableHeader } from './RoundsTableHeader';
import { IRound, RoundsTableRow } from './RoundsTableRow';

import { filterAndAdjustRounds } from '../utils/filter-and-adjust-rounds';
import { weekStore } from '../stores/week-store';

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

const GET_ROUNDS_QUERY = gql`
  query GET_ROUNDS {
    rounds {
      id
      score
      week {
        id
        weekNumber
        year {
          id
          year
        }
      }
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const RoundsTable = observer(() => {
  const { data, loading } = useQuery(GET_ROUNDS_QUERY, { fetchPolicy: 'network-only' });
  if (loading) {
    return null;
  }
  const roundsToDisplay = filterAndAdjustRounds(data.rounds, weekStore.weekId);
  return (
    <Paper className={containerStyle}>
      <Table className={contentStyle} aria-label="simple table">
        <RoundsTableHeader />
        <TableBody>
          {roundsToDisplay.map((round: IRound) => <RoundsTableRow key={round.id} data={round} />)}
        </TableBody>
      </Table>
    </Paper>
  );
});
