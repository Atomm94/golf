import React from 'react';
import { ApolloError } from 'apollo-boost';

import { TextInput } from '../../../components/form/TextInput';
import { Divider } from '../../../components/Divider';
import { MaterialButton } from '../../../components/form/MaterialButton';
import { ErrorMessage } from '../../../components/form/ErrorMessage';

interface IEditRoundForm {
  loading: boolean;
  error: ApolloError | undefined;
}

export const EditRoundForm = ({ loading, error }: IEditRoundForm) => {
  return (
    <div>
      <TextInput label="Score" name="score" />
      <Divider height={20} />
      {error && <ErrorMessage message="Error while editing score" />}
      <Divider height={20} />
      <MaterialButton label="Save" loading={loading} />
    </div>
  );
};
