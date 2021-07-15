import React from 'react';
import { ApolloError } from 'apollo-boost';

import { TextInput } from '../../../components/form/TextInput';
import { MaterialButton } from '../../../components/form/MaterialButton';
import { Divider } from '../../../components/Divider';
import { SelectInput } from '../../../components/form/SelectInput';
import { ErrorMessage } from '../../../components/form/ErrorMessage';

import { countriesSelectData } from '../../../data/countries-select-data';

interface IEditUserForm {
  loading: boolean;
  error: ApolloError | undefined;
}

export const CreateOrEditUserForm = ({ loading, error }: IEditUserForm) => {
  return (
    <div>
      <TextInput label="First Name" name="firstName" />
      <Divider height={20} />
      <TextInput label="Last Name" name="lastName" />
      <Divider height={20} />
      <TextInput label="Email" name="email" />
      <Divider height={20} />
      <TextInput label="Nickname" name="description" />
      <Divider height={20} />
      <SelectInput label="Location" name="location" options={countriesSelectData} />
      <Divider height={20} />
      <TextInput label="Handicap" name="handicap" />
      <Divider height={20} />
      <TextInput label="Phone" name="phone" />
      <Divider height={20} />
      <TextInput label="Money" name="money" />
      <Divider height={20} />
      {error && <ErrorMessage message="Error while editing user" />}
      <Divider height={20} />
      <MaterialButton label="Save" loading={loading} />
    </div>
  );
};
