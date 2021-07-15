import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Fab } from '@material-ui/core';
import { DeleteOutlined, EditOutlined, LockOutlined, CameraAltOutlined } from '@material-ui/icons';
import TableRow from '@material-ui/core/TableRow';
import { css } from 'emotion';

import { DeleteUserDialog } from '../modal/DeleteUserDialog';
import { EditUserDialog } from '../modal/EditUserDialog';
import { EditPasswordDialog } from '../modal/EditPasswordDialog';
import { EditHatImageDialog } from '../modal/EditHatImageDialog';

const actionIconStyle = css`
  width: 38px !important;
  height: 38px !important;
`;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  location: string;
  handicap: string;
  phone: string;
  money: string;
}

interface IUsersTableRow {
  data: IUser;
}

export const UsersTableRow = (props: IUsersTableRow) => {
  const [deleteUserVisible, setDeleteUserVisible] = useState(false);
  const [editUserVisible, setEditUserVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);
  const [editHatImageVisible, setEditHatImageVisible] = useState(false);
  const { data } = props;
  const { firstName, lastName, email, description, handicap, phone, money, location, id } = data;
  return (
    <TableRow>
      <TableCell component="th" scope="row">{firstName}</TableCell>
      <TableCell align="right">{lastName}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{email}</TableCell>
      {/*<TableCell align="right">{location.replace(/^\w/, c => c.toUpperCase())}</TableCell>*/}
      <TableCell align="right">{handicap}</TableCell>
      <TableCell align="right">{phone}</TableCell>
      <TableCell align="right">{money}</TableCell>
      <TableCell align="center">
        <Fab color="primary" aria-label="edit" className={actionIconStyle} onClick={() => setEditUserVisible(true)}>
          <EditOutlined />
        </Fab>
      </TableCell>
      <TableCell align="center">
        <Fab
          color="primary"
          aria-label="delete"
          className={actionIconStyle}
          onClick={() => setEditPasswordVisible(true)}
        >
          <LockOutlined />
        </Fab>
      </TableCell>
      <TableCell align="center">
        <Fab
          color="primary"
          aria-label="edit"
          className={actionIconStyle}
          onClick={() => setEditHatImageVisible(true)}
        >
          <CameraAltOutlined />
        </Fab>
      </TableCell>
      <TableCell align="center">
        <Fab
          color="secondary"
          aria-label="delete"
          className={actionIconStyle}
          onClick={() => setDeleteUserVisible(true)}
        >
          <DeleteOutlined />
        </Fab>
      </TableCell>
      <DeleteUserDialog open={deleteUserVisible} onClose={() => setDeleteUserVisible(false)} userId={id} />
      <EditUserDialog open={editUserVisible} onClose={() => setEditUserVisible(false)} user={data} />
      <EditPasswordDialog open={editPasswordVisible} onClose={() => setEditPasswordVisible(false)} userId={id} />
      <EditHatImageDialog open={editHatImageVisible} onClose={() => setEditHatImageVisible(false)} userId={id} />
    </TableRow>
  );
};
