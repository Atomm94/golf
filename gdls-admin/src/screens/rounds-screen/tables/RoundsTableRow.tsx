import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Fab } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import TableRow from '@material-ui/core/TableRow';
import { css } from 'emotion';

import { EditRoundDialog } from '../modal/EditRoundDialog';
import { DeleteRoundDialog } from '../modal/DeleteRoundDialog';

const actionIconStyle = css`
  width: 38px !important;
  height: 38px !important;
`;

export interface IRound {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  weekNumber: number;
  year: number;
  score: string;
}

interface IRoundsTableRow {
  data: IRound;
}

export const RoundsTableRow = (props: IRoundsTableRow) => {
  const { data } = props;
  const { firstName, lastName, email, weekNumber, year, score, id } = data;
  const [deleteRoundVisible, setDeleteRoundVisible] = useState(false);
  const [editRoundVisible, setEditRoundVisible] = useState(false);
  return (
    <TableRow>
      <TableCell component="th" scope="row">{firstName}</TableCell>
      <TableCell align="right">{lastName}</TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{weekNumber}</TableCell>
      <TableCell align="right">{year}</TableCell>
      <TableCell align="right">{score}</TableCell>
      <TableCell align="center">
        <Fab
          color="primary"
          aria-label="edit"
          className={actionIconStyle}
          onClick={() => setEditRoundVisible(true)}
        >
          <EditOutlined />
        </Fab>
      </TableCell>
      <TableCell align="center">
        <Fab
          color="secondary"
          aria-label="delete"
          className={actionIconStyle}
          onClick={() => setDeleteRoundVisible(true)}
        >
          <DeleteOutlined />
        </Fab>
      </TableCell>
      <EditRoundDialog open={editRoundVisible} onClose={() => setEditRoundVisible(false)} round={data} />
      <DeleteRoundDialog roundId={id} onClose={() => setDeleteRoundVisible(false)} open={deleteRoundVisible} />
    </TableRow>
  );
};
