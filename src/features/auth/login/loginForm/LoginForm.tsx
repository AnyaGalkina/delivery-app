import React, { ReactElement } from 'react';

import { FormControl, FormGroup, Paper } from '@mui/material';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/order
import { SubmitHandler, useForm } from 'react-hook-form';

import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AuthInput, AUTH_PATH } from '../../../../common';
import { logIn } from '../../auth-reducer';
import { LogInType } from '../../authAPI';
import styles from '../../signUp/SignUp.module.css';

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector((state) => state.app.appStatus);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInType>();

  const disabled = appStatus === 'loading';

  const onSubmit: SubmitHandler<LogInType> = (data) => {
    dispatch(logIn(data));
    reset();
  };

  // @ts-ignore
  return (
    <Paper
      elevation={2}
      style={{ width: '360px', textAlign: 'center', marginTop: '70px', height: '90%' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <h2 className={styles.title}>Log in</h2>
          <FormGroup className={styles.formControl}>
            <AuthInput
              name="login"
              placeholder="Login or Email"
              required
              errors={errors.login && errors.login}
              register={register}
              disabled={disabled}
            />
            <AuthInput
              name="password"
              placeholder="Password"
              required
              errors={errors.password && errors.password}
              register={register}
              disabled={disabled}
            />
            <div>
              <NavLink to={`/auth/${AUTH_PATH.FORGOT_PASSWORD}`}>
                Forgot Your Password
              </NavLink>
            </div>
            <Button type="submit" variant="contained" disabled={disabled}>
              SIGN UP
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Paper>
  );
};
