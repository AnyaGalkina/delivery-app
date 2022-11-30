import React, { ReactElement } from 'react';

import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../app/hooks';
import { ADMIN_PATH, AUTH_PATH } from '../../../common';

import styles from './Login.module.css';
import { LoginForm } from './loginForm/LoginForm';

export const Login = (): ReactElement => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const appStatus = useAppSelector((state) => state.app.appStatus);

  const disabled = appStatus === 'loading';

  const onSignUpClick = (): void => {
    navigate(`/auth/${AUTH_PATH.REGISTRATION}`);
  };

  if (isAuth) {
    navigate(`/${ADMIN_PATH.MAIN}`);
  }

  return (
    <div className={styles.loginContainer}>
      <div>
        <LoginForm />
      </div>
      <div>
        <Paper
          elevation={2}
          sx={{
            width: '360px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '70px',
            height: '90%',
          }}
        >
          <h2>Hello, Partner!</h2>
          <p>Enter your details and start work with us</p>
          <Button
            sx={{ marginTop: '20px' }}
            onClick={onSignUpClick}
            variant="outlined"
            disabled={disabled}
          >
            Sign Up
          </Button>
        </Paper>
      </div>
    </div>
  );
};
