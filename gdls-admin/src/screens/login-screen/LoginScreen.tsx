import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { css } from 'emotion';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

import { ILoginFormValues, LoginForm } from './components/LoginForm';
import { Divider } from '../../components/Divider';
import { setToken } from '../../services/get-token';

const contentStyle = css`
  width: 500px;
  margin: 0 auto;
  @media(max-width: 800px) {
  width: unset;
  }
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Email format is not correct').required('Email is required field'),
  password: yup.string().required('Password is required field'),
});

const LOGIN_MUTATION = gql`
  mutation LOGIN($email: String!, $password: String!) {
    emailLogin(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const LoginScreen = () => {
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const history = useHistory();
  const handleSubmit = async (values: ILoginFormValues) => {
    const result = await loginMutation({ variables: values });
    const token = get(result, 'data.emailLogin.token');
    if (token) {
      await setToken(token);
      history.push('/');
    }
  };
  return (
    <div>
      <Divider height={40} />
      <Card className={contentStyle}>
        <CardContent className={formStyle}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            component={() => <LoginForm loading={loading} error={error} />}
          />
        </CardContent>
      </Card>
    </div>
  );
};
