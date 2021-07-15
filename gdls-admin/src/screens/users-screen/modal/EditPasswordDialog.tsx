import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';
import { css } from 'emotion';

import { MaterialModal } from '../../../components/MaterialModal';
import { TextInput } from '../../../components/form/TextInput';
import { MaterialButton } from '../../../components/form/MaterialButton';
import { ErrorMessage } from '../../../components/form/ErrorMessage';
import { Divider } from '../../../components/Divider';

const contentStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD($id: EntityId!, $password: String!) {
    updateUser(input: { id: $id, password: $password }) {
      id
    }
  }
`;

interface IDeleteUserDialog {
  open: boolean
  onClose(): void;
  userId: string;
}

interface IValues {
  password: string;
}

const validationSchema = yup.object({
  password: yup.string().required('Password is required field'),
});

export const EditPasswordDialog = (props: IDeleteUserDialog) => {
  const { open, onClose, userId } = props;
  const [changePasswordMutation, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION);
  const handleSubmit = async (values: IValues) => {
    const variables = { ...values, id: userId };
    const result = await changePasswordMutation({ variables });
    if (get(result, 'data.updateUser.id')) {
      onClose();
    }
  };
  return (
    <MaterialModal open={open} title="Change password" onClose={onClose}>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className={contentStyle}>
          <TextInput label="Password" name="password" type="password" />
          <Divider height={10} />
          {error && <ErrorMessage message="Error while changing password" />}
          <Divider height={10} />
          <MaterialButton label="Save" loading={loading} />
        </div>
      </Formik>
    </MaterialModal>
  );
};
