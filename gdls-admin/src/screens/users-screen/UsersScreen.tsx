import React from 'react';
import { css } from 'emotion';

import { SideNavigation } from '../../components/SideNavigation';
import { UsersTable } from './table/UsersTable';
import { CreateUserSection } from './sections/CreateUserSection';

const containerStyle = css`
  display: flex;
  @media(max-width: 800px) {
    flex-direction: column;
  }
`;

const contentStyle = css`
  margin: 20px;
`;

export const UsersScreen = () => {
  return (
    <div className={containerStyle}>
      <SideNavigation />
      <div className={contentStyle}>
        <CreateUserSection />
        <UsersTable />
      </div>
    </div>
  );
};
