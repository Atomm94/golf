import React, { ReactNode } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { css } from 'emotion';

const buttonStyle = css`
  width: 300px;
`;

const loaderStyle = css`
  width: 20px !important;
  height: 20px !important;
  margin: 2px 0;
  color: white !important;
`;

interface IMaterialButton {
  label: string;
  loading: boolean;
  color?: 'primary' | 'secondary';
  handleSubmit?(): void;
  endIcon?: ReactNode;
}

export const MaterialButton = (props: IMaterialButton) => {
  const { label, loading, color, handleSubmit: customHandleSubmit, endIcon } = props;
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      variant="contained"
      color={color || 'primary'}
      className={buttonStyle}
      onClick={customHandleSubmit || handleSubmit as any}
      endIcon={endIcon || null}
    >
      {loading ? <CircularProgress className={loaderStyle} /> : label}
    </Button>
  );
};
