import React, { ReactElement } from 'react';

import { FormControl, FormGroup, Paper } from '@mui/material';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/order
import { SubmitHandler, useForm } from 'react-hook-form';

// import {} from '../signUp/SignUp';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { AppStatusType } from '../../../../app/app-reducer';
import { useAppDispatch } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { AuthInput } from '../../../../common/components/authInput/AuthInput';
import { AUTH_PATH } from '../../../../common/enums/enum';
import { logIn } from '../../auth-reducer';
import { LogInType } from '../../authAPI';
import styles from '../../signUp/SignUp.module.css';

export const LoginForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const appStatus = useSelector<RootState, AppStatusType>((state) => state.app.appStatus);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInType>();

  const disable = appStatus === 'loading';

  const onSubmit: SubmitHandler<LogInType> = (data) => {
    dispatch(logIn(data));
    // console.log(JSON.stringify(data));
    reset();
  };

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
              name={'email' || 'login'}
              placeholder="Login or Email"
              required
              errors={(errors.email && errors.email) || (errors.login && errors.login)}
              register={register}
              disable={disable}
              // maxLength={50}
            />
            <AuthInput
              name="password"
              placeholder="Password"
              required
              errors={errors.password && errors.password}
              register={register}
              disable={disable}
            />
            <div>
              <NavLink to={`/auth/${AUTH_PATH.FORGOT_PASSWORD}`}>
                Forgot Your Password
              </NavLink>
            </div>
            <Button type="submit" variant="contained">
              SIGN UP
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Paper>
  );
};
