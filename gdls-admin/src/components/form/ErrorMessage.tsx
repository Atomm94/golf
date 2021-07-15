import React from 'react';
import { css } from 'emotion';

import { colors } from '../../theme/colors';

const errorMessageStyle = css`
  font-size: 13px;
  color: ${colors.red};
  width: 300px;
`;

interface IErrorMessage {
  message: string;
}

export const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <div className={errorMessageStyle}>{message}</div>
  );
};
