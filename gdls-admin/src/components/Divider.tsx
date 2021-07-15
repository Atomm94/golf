import React from 'react';
import { css } from 'emotion';

const dividerStyle = (height: number) => css`
  height: ${height}px;
`;

interface IDivider {
  height: number;
}

export const Divider = ({ height }: IDivider) => {
  return (
    <div className={dividerStyle(height)} />
  );
};
