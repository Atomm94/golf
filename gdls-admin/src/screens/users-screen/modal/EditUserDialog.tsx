import React from 'react';
import { css } from 'emotion';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';

import { MaterialModal } from '../../../components/MaterialModal';
import { CreateOrEditUserForm } from '../form/CreateOrEditUserForm';

import { IUser } from '../table/UsersTableRow';

const modalStyle = css`
  .MuiPaper-root {
    padding: 0 20px;
  }
`;

const contentStyle = css`
  padding: 0 20px 20px 20px;
`;

const validationSchema = yup.object({
  id: yup.string().required(),
  firstName: yup.string().required('First name is required field'),
  lastName: yup.string().required('Last name is required field'),
  email: yup.string().email('Email format is not correct').required('Email is required field'),
  description: yup.string().nullable(),
  location: yup.string().required('Location is required field'),
  handicap: yup.number().required('Handicap is required field'),
  phone: yup.string().nullable(),
  money: yup.number().required('Money is required field'),
});

const EDIT_USER_MUTATION = gql`
  mutation EDIT_USER($id: EntityId!, $email: String!, $location: String!, $handicap: Float!, $firstName: String!, $lastName: String!, $description: String, $phone: String, $money: Float!) {
    updateUser(input: { id: $id, email: $email, location: $location, handicap: $handicap, firstName: $firstName, lastName: $lastName, description: $description, phone: $phone, money: $money }) {
      id
    }
  }
`;

interface IEditUserDialog {
  user: IUser;
  onClose(): void;
  open: boolean;
}

export const EditUserDialog = (props: IEditUserDialog) => {
  const { user, onClose, open } = props;
  const [editUserMutation, { error, loading }] = useMutation(EDIT_USER_MUTATION);
  const handleSubmit = async (values: IUser) => {
    const variables = {
      ...values,
      handicap: parseInt(values.handicap),
      money: parseInt(values.money),
    };
    const result = await editUserMutation({ variables, refetchQueries: ['GET_USERS'] });
    if (get(result, 'data.updateUser.id')) {
      onClose();
    }
  };
  return (
    <MaterialModal
      open={open}
      title="Edit Profile"
      onClose={onClose}
      className={modalStyle}
    >
      <div className={contentStyle}>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          component={() => <CreateOrEditUserForm loading={loading} error={error} />}
        />
      </div>
    </MaterialModal>
  );
};
