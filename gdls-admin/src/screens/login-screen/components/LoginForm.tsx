import React from 'react';
import { css } from 'emotion';
import { ApolloError } from 'apollo-boost';

import { Divider } from '../../../components/Divider';
import { TextInput } from '../../../components/form/TextInput';
import { MaterialButton } from '../../../components/form/MaterialButton';
import { ErrorMessage } from '../../../components/form/ErrorMessage';

const headerStyle = css`
  font-size: 30px;
`;

export interface ILoginFormValues {
  email: string;
  password: string;
}

interface ILoginForm {
  error: ApolloError | undefined;
  loading: boolean;
}

export const LoginForm = ({ error, loading }: ILoginForm) => {
  return (
    <div>
      <Divider height={15} />
      <div className={headerStyle}>Login</div>
      <Divider height={15} />
      {!!error && <ErrorMessage message="The credentials you have entered are not correct." />}
      <Divider height={20} />
      <TextInput label="Email" name="email" />
      <Divider height={30} />
      <TextInput label="Password" type="password" name="password" />
      <Divider height={30} />
      <MaterialButton label="LOGIN" loading={loading} />
      <Divider height={30} />
    </div>
  );
};
