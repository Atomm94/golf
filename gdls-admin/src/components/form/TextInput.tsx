import React from 'react';
import { TextField } from '@material-ui/core';
import { css } from 'emotion';
import { useFormikContext } from 'formik';
import { get } from 'lodash';

const textInputStyle = css`
  width: 300px;
`;

interface ITextInput {
  label: string;
  name: string;
  type?: string;
}

export const TextInput = (props: ITextInput) => {
  const { label, type = 'text', name } = props;
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  return (
    <TextField
      label={label}
      type={type}
      value={get(values, name)}
      onChange={e => setFieldValue(name, e.target.value)}
      className={textInputStyle}
      error={!!get(errors, name) && !!get(touched, name)}
      helperText={!!get(touched, name) && get(errors, name)}
    />
  );
};
