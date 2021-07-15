import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { css } from 'emotion';

import { clearToken, getToken } from '../services/get-token';

const appIcon = require('./assets/app-icon.png');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

const titleStyle = css`
  flex-grow: 1;
  padding-left: 170px;
  @media(max-width: 800px) {
    padding-left: 0;
    font-size: 1rem !important;
  }
  display: flex;
  align-items: center;
`;

const iconStyle = css`
  width: 35px;
  height: 35px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleLogout = async () => {
    await clearToken();
    history.push('/login');
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={titleStyle}>
            <img src={appIcon} alt="icon" className={iconStyle} />GDLS - Admin Panel
          </Typography>
          {getToken() && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
};
