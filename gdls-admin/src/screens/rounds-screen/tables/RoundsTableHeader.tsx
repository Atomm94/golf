import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

export const RoundsTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>First Name</TableCell>
        <TableCell align="right">Last Name</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Week Number</TableCell>
        <TableCell align="right">Year</TableCell>
        <TableCell align="right">Score</TableCell>
        <TableCell align="center">Edit</TableCell>
        <TableCell align="center">Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};
