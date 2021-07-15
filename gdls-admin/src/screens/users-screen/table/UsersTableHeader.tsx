import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

export const UsersTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>First Name</TableCell>
        <TableCell align="right">Last Name</TableCell>
        <TableCell align="right">Nickname</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Nationality</TableCell>
        <TableCell align="right">Handicap</TableCell>
        <TableCell align="right">Phone</TableCell>
        <TableCell align="right">Money</TableCell>
        <TableCell align="center">Edit</TableCell>
        <TableCell align="center">Change password</TableCell>
        <TableCell align="center">Dumb Hat Image</TableCell>
        <TableCell align="center">Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};
