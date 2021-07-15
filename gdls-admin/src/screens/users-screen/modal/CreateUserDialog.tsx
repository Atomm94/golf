import React from 'react';
import { css } from 'emotion';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';

import { MaterialModal } from '../../../components/MaterialModal';
import { CreateOrEditUserForm } from '../form/CreateOrEditUserForm';

const modalStyle = css`
  .MuiPaper-root {
    padding: 0 20px;
  }
`;

const contentStyle = css`
  padding: 0 20px 20px 20px;
`;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  description: '',
  location: '',
  handicap: '',
  phone: '',
  money: '',
};

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required field'),
  lastName: yup.string().required('Last name is required field'),
  email: yup.string().email('Email format is not correct').required('Email is required field'),
  description: yup.string().nullable(),
  location: yup.string().required('Location is required field'),
  handicap: yup.number().required('Handicap is required field'),
  phone: yup.string().nullable(),
  money: yup.number().required('Money is required field'),
});

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER($email: String!, $location: String!, $handicap: Float!, $firstName: String!, $lastName: String!, $description: String, $phone: String, $money: Float!) {
    createUser(input: { email: $email, location: $location, handicap: $handicap, firstName: $firstName, lastName: $lastName, description: $description, phone: $phone, money: $money, password: "password" }) {
      id
    }
  }
`;

interface ICreateUserDialog {
  onClose(): void;
  open: boolean;
}

export const CreateUserDialog = ({ onClose, open }: ICreateUserDialog) => {
  const [createUserMutation, { loading, error }] = useMutation(CREATE_USER_MUTATION);
  const handleSubmit = async (values: any) => {
    const variables = {
      ...values,
      money: parseInt(values.money),
      handicap: parseInt(values.handicap),
    };
    const result = await createUserMutation({ variables, refetchQueries: ['GET_USERS'] });
    if (get(result, 'data.createUser.id')) {
      onClose();
    }
  };
  return (
    <MaterialModal open={open} title="Create User" onClose={onClose} className={modalStyle}>
      <div className={contentStyle}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          component={() => <CreateOrEditUserForm loading={loading} error={error} />}
        />
      </div>
    </MaterialModal>
  );
};
