import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountCircle, GolfCourse } from '@material-ui/icons';
import { css } from 'emotion';
import { useHistory } from 'react-router-dom';

const containerStyle = css`
  width: 200px;
  background-color: white;
  min-height: calc(100vh - 64px);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  @media(max-width: 800px) {
    min-height: unset;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
`;

export const SideNavigation  = () => {
  const history = useHistory();
  return (
    <div className={containerStyle}>
      <List>
        <ListItem button onClick={() => history.push(`/`)}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => history.push(`/rounds`)}>
          <ListItemIcon><GolfCourse /></ListItemIcon>
          <ListItemText primary="Past Results" />
        </ListItem>
      </List>
    </div>
  );
};
