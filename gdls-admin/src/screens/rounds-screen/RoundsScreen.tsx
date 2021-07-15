import React from 'react';
import { css } from 'emotion';

import { SideNavigation } from '../../components/SideNavigation';
import { FilterRoundsSection } from './sections/FilterRoundsSection';
import { RoundsTable } from './tables/RoundsTable';

const containerStyle = css`
  display: flex;
  @media(max-width: 800px) {
    flex-direction: column;
  }
`;

const contentStyle = css`
  margin: 20px;
`;

export const RoundsScreen = () => {
  return (
    <div className={containerStyle}>
      <SideNavigation />
      <div className={contentStyle}>
        <FilterRoundsSection />
        <RoundsTable />
      </div>
    </div>
  );
};
