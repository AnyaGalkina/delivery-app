import React, { ReactElement, ReactNode } from 'react';

import { Button, Dialog, DialogTitle, Typography } from '@mui/material';

import style from './BasicModal.module.css';

type BasicModalType = {
  children?: ReactNode;
  open: boolean;
  title: string;
  onSuccessClickHandler?: () => void;
  onClickHandler?: () => void;
  buttonTitle?: string;
  successButtonTitle?: string;
};

export const BasicModal = ({
  children,
  open,
  title,
  onClickHandler,
  buttonTitle,
  onSuccessClickHandler,
  successButtonTitle,
}: BasicModalType): ReactElement => {
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <Typography variant="h6">{title}</Typography>
        </DialogTitle>
        <>
          {children}
          <div className={style.buttonsBlock}>
            {successButtonTitle && (
              <Button variant="contained" color="success" onClick={onSuccessClickHandler}>
                {successButtonTitle}
              </Button>
            )}
            {buttonTitle && (
              <Button variant="contained" onClick={onClickHandler}>
                {buttonTitle}
              </Button>
            )}
          </div>
        </>
      </Dialog>
    </div>
  );
};
