import React from 'react';
import { Formik } from 'formik';
import { css } from 'emotion';
import { gql } from 'apollo-boost';
import { get } from 'lodash';
import { useMutation } from '@apollo/react-hooks';

import { MaterialModal } from '../../../components/MaterialModal';
import { MaterialButton } from '../../../components/form/MaterialButton';

const contentStyle = css`
  padding: 0 20px 20px 20px;
`;

const buttonsStyle = css`
  display: flex;
  flex-direction: row;
`;

const descriptionStyle = css`
  margin-bottom: 20px;
`;

const dividerStyle = css`
  width: 20px;
`;

const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER($ids: [ID!]!) {
    deleteUsers(ids: $ids)
  }
`;

interface IDeleteUserDialog {
  open: boolean
  onClose(): void;
  userId: string;
}

export const DeleteUserDialog = (props: IDeleteUserDialog) => {
  const { open, onClose, userId } = props;
  const [deleteUserMutation, { loading }] = useMutation(DELETE_USER_MUTATION);
  const handleSubmit = async () => {
    const variables = { ids: [userId] };
    const result = await deleteUserMutation(
      { variables, refetchQueries: ['GET_USERS'] },
    );
    if (get(result, 'data.deleteUsers')) {
      onClose();
    }
  };
  return (
    <MaterialModal
      open={open}
      title="Confirmation Dialog"
      onClose={onClose}
    >
      <div className={contentStyle}>
        <div className={descriptionStyle}>Are you sure you want to delete this user?</div>
        <div>
          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            component={() => (
              <div className={buttonsStyle}>
                <MaterialButton label="Cancel" loading={false} handleSubmit={onClose} />
                <div className={dividerStyle} />
                <MaterialButton label="Delete" loading={loading} color="secondary" />
              </div>
            )}
          />
        </div>
      </div>
    </MaterialModal>
  );
};
