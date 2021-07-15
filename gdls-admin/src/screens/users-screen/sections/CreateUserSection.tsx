import React, { useState } from 'react';
import { Formik } from 'formik';
import { ControlPoint } from '@material-ui/icons';
import { css } from 'emotion';

import { MaterialButton } from '../../../components/form/MaterialButton';
import { Divider } from '../../../components/Divider';
import { CreateUserDialog } from '../modal/CreateUserDialog';

const containerStyle = css`
  @media(max-width: 800px) {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export const CreateUserSection = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={containerStyle}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <MaterialButton
          label="New user"
          loading={false}
          handleSubmit={() => setShowModal(true)}
          endIcon={<ControlPoint />}
        />
      </Formik>
      <Divider height={20} />
      <CreateUserDialog onClose={() => setShowModal(false)} open={showModal} />
    </div>
  );
};
