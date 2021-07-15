import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { css } from 'emotion';

const containerStyle = css`
  width: 100%;
`;

interface IOption {
  label: string;
  value: string;
}

interface ISelectInput {
  label: string;
  name: string;
  options: IOption[];
  onChange?(arg0: string): void;
  value?: string;
}

export const SelectInput = ({ label, name, options, onChange, value }: ISelectInput) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  return (
    <FormControl error={!!get(errors, name) && !!get(touched, name)} className={containerStyle}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || get(values, name)}
        onChange={e => {
          onChange ?
            onChange(e.target.value as string) :
            setFieldValue(name, e.target.value);
        }}
      >
        {options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
      </Select>
      {!!get(touched, name) && get(errors, name) &&  <FormHelperText>{get(errors, name)}</FormHelperText>}
    </FormControl>
  );
};
