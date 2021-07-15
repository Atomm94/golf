import React from 'react';
import { css } from 'emotion';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { get } from 'lodash';

import { MaterialModal } from '../../../components/MaterialModal';
import { EditRoundForm } from '../forms/EditRoundForm';

import { IRound } from '../tables/RoundsTableRow';

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
  score: yup.number().required(),
});

const EDIT_ROUND_MUTATION = gql`
  mutation EDIT_ROUND($id: EntityId!, $score: Float!) {
    updateRound(input: { id: $id, score: $score }) {
      id
    }
  }
`;

interface IValues {
  id: string;
  score: string;
}

interface IEditRoundDialog {
  round: IRound;
  onClose(): void;
  open: boolean;
}

export const EditRoundDialog = (props: IEditRoundDialog) => {
  const { round, onClose, open } = props;
  const initialValues = { id: round.id, score: round.score };
  const [editRoundMutation, { error, loading }] = useMutation(EDIT_ROUND_MUTATION);
  const handleSubmit = async (values: IValues) => {
    const variables = {
      ...values,
      score: parseInt(values.score),
    };
    const result = await editRoundMutation({ variables, refetchQueries: ['GET_ROUNDS'] })
    if (get(result, 'data.updateRound.id')) {
      onClose();
    }
  };
  return (
    <MaterialModal
      open={open}
      title="Edit Round"
      onClose={onClose}
      className={modalStyle}
    >
      <div className={contentStyle}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          component={() => <EditRoundForm loading={loading} error={error} />}
        />
      </div>
    </MaterialModal>
  );
};
