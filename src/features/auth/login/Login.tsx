import React, { ReactElement } from 'react';

import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { AUTH_PATH } from '../../../common/enums/enum';

import styles from './Login.module.css';
import { LoginForm } from './loginForm/LoginForm';

export const Login = (): ReactElement => {
  const navigate = useNavigate();

  const onSignUpClick = (): void => {
    navigate(`/auth/${AUTH_PATH.REGISTRATION}`);
  };

  return (
    <div className={styles.loginContainer}>
      <div>
        <LoginForm />
      </div>
      <div>
        <Paper
          elevation={2}
          style={{
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
            style={{ marginTop: '20px' }}
            onClick={onSignUpClick}
            variant="outlined"
          >
            Sign Up
          </Button>
        </Paper>
      </div>
    </div>
  );
};
