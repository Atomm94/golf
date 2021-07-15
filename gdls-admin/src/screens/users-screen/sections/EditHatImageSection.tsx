import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { get } from 'lodash';
import { css } from 'emotion';
// @ts-ignore
import FileBase64 from 'react-file-base64';
import { Formik } from 'formik';

import { Divider } from '../../../components/Divider';
import { MaterialButton } from '../../../components/form/MaterialButton';
import { ErrorMessage } from '../../../components/form/ErrorMessage';

const contentStyle = css`
  margin: 30px 0 20px 0;
`;

const descriptionStyle = css`
  margin-bottom: 20px;
  text-align: center;
`;

const USER_IMAGE_QUERY = gql`
  query USER_IMAGE($id: EntityId!) {
    user(id: $id) {
      dumbHatPicture {
        id
        contentBase64
      }
    }
  }
`;

const UPDATE_DUMB_HAT_MUTATION = gql`
  mutation UPDATE_DUMB_HAT($userId: EntityId!, $base64: String!) {
    updateUser(input: { id: $userId, dumbHatPicture: { contentBase64: $base64 } }) {
      id
    }
  }
`;

interface IEditHatImageSection {
  userId: string;
  onClose(): void;
}

export const EditHatImageSection = ({ userId, onClose }: IEditHatImageSection) => {
  const [file, setFile] = useState(undefined);
  const { data, loading } = useQuery(USER_IMAGE_QUERY, { variables: { id: userId } });
  const [updateDumbHatMutation, { loading: updateLoading, error }] = useMutation(UPDATE_DUMB_HAT_MUTATION);
  const handleSubmit = async () => {
    const variables = { userId, base64: get(file, 'base64') };
    const result = await updateDumbHatMutation({ variables, refetchQueries: ['USER_IMAGE'] });
    if (get(result, 'data.updateUser.id')) {
      onClose();
    }
  };
  if (loading) {
    return <CircularProgress />;
  }
  const contentBase64 = get(data, 'user.dumbHatPicture.contentBase64');
  return (
    <div>
      {contentBase64 ?
        <div className={descriptionStyle} /> :
        <div className={descriptionStyle}>Image needs to be set up</div>}
      {contentBase64 && (
        <img src={get(file, 'base64') || get(data, 'user.dumbHatPicture.contentBase64')} alt="dumb hat image" />
      )}
        <Formik initialValues={{}} onSubmit={() => {}}>
          <div className={contentStyle}>
            <FileBase64 multiple={false} onDone={(something: any) => setFile(something)} />
            <Divider height={20} />
            {error && <ErrorMessage message="Unable to upload dumb hat image" />}
            <Divider height={20} />
            <MaterialButton label="Upload" loading={updateLoading} handleSubmit={handleSubmit} />
          </div>
        </Formik>
    </div>
  );
};
