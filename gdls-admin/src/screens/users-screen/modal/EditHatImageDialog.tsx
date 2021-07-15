import React from 'react';
import { css } from 'emotion';

import { MaterialModal } from '../../../components/MaterialModal';
import { EditHatImageSection } from '../sections/EditHatImageSection';

const modalStyle = css`
  .MuiPaper-root {
    padding: 0 20px;
    max-width: unset;
  }
`;

interface IEditHatImageDialog {
  open: boolean;
  onClose(): void;
  userId: string;
}

export const EditHatImageDialog = (props: IEditHatImageDialog) => {
  const { open, onClose, userId } = props;
  return (
    <MaterialModal
      open={open}
      title="Change Dumb Hat Image"
      onClose={onClose}
      className={modalStyle}
    >
      <EditHatImageSection userId={userId} onClose={onClose} />
    </MaterialModal>
  );
};
