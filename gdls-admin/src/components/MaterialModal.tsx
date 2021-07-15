import React, { ReactNode } from 'react';
import { DialogTitle, Dialog } from '@material-ui/core';

interface SimpleDialogProps {
  open: boolean;
  title: string;
  onClose: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const MaterialModal = (props: SimpleDialogProps) => {
  const { onClose, title, open, children, className } = props;
  return (
    <Dialog className={className} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
