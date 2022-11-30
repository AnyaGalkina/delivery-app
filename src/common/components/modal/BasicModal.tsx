import React, { memo, ReactElement, ReactNode } from 'react';

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
  disabled?: boolean;
};

export const BasicModal = memo(
  ({
    children,
    open,
    title,
    onClickHandler,
    buttonTitle,
    onSuccessClickHandler,
    successButtonTitle,
    disabled,
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
                <Button
                  variant="contained"
                  color="success"
                  onClick={onSuccessClickHandler}
                  disabled={disabled && disabled}
                >
                  {successButtonTitle}
                </Button>
              )}
              {buttonTitle && (
                <Button
                  variant="contained"
                  onClick={onClickHandler}
                  disabled={disabled && disabled}
                >
                  {buttonTitle}
                </Button>
              )}
            </div>
          </>
        </Dialog>
      </div>
    );
  },
);
