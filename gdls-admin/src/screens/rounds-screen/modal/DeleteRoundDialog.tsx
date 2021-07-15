import React from 'react';
import { css } from 'emotion';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import { get } from 'lodash';

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

const DELETE_ROUND_MUTATION = gql`
  mutation DELETE_ROUND($ids: [ID!]!) {
    deleteRounds(ids: $ids)
  }
`;

interface IDeleteRoundDialog {
  open: boolean
  onClose(): void;
  roundId: string;
}

export const DeleteRoundDialog = (props: IDeleteRoundDialog) => {
  const { open, onClose, roundId } = props;
  const [deleteRoundMutation, { loading }] = useMutation(DELETE_ROUND_MUTATION);
  const handleSubmit = async () => {
    const variables = { ids: [roundId] };
    const result = await deleteRoundMutation(
      { variables, refetchQueries: ['GET_ROUNDS'] },
    );
    if (get(result, 'data.deleteRounds')) {
      onClose();
    }
  };
  return (
    <MaterialModal open={open} title="Confirmation Dialog" onClose={onClose}>
      <div className={contentStyle}>
        <div className={descriptionStyle}>Are you sure you want to delete this score?</div>
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
