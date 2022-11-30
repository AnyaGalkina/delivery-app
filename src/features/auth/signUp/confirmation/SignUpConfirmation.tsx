import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../app/hooks';
import { AUTH_PATH } from '../../../../common';
import { sendConfirmationCode } from '../../auth-reducer';

export const SignUpConfirmation = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const onConfirmationClick = (): void => {
    const code = searchParams.get('confirmCode');

    if (code) {
      dispatch(sendConfirmationCode({ code }));
      navigate(`/auth/${AUTH_PATH.LOGIN}`);
    }
  };

  return (
    <div>
      Welcome to our Team! Now you can sign in private cabinet.
      <Button onClick={onConfirmationClick} variant="contained">
        Ok
      </Button>
    </div>
  );
};
