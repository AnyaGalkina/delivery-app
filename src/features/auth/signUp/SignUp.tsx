import React, { ReactElement, useCallback, useState } from 'react';

import { FormControl, FormGroup, Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AUTH_PATH, BasicModal, AuthInput } from '../../../common';
import { resendConfirmationCode, signUp } from '../auth-reducer';

import styles from './SignUp.module.css';

export interface SignUpFormData {
  companyName: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp = (): ReactElement => {
  const dispatch = useAppDispatch();

  const appStatus = useAppSelector((state) => state.app.appStatus);
  const email = useAppSelector((state) => state.auth.email);
  // const isSignedUp = useAppSelector((state) => state.auth.isSignedUp);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const disabled = appStatus === 'loading';

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, login, password, companyName } = data;

    dispatch(signUp({ email, login, password, companyName }));
    setOpen(true);
    reset();
  };

  const onResendClick = useCallback((): void => {
    dispatch(resendConfirmationCode({ email }));
    setOpen(false);
    navigate(`/auth/${AUTH_PATH.LOGIN}`);
  }, [email, open]);

  const onOkClick = useCallback((): void => {
    setOpen(false);
    navigate(`/auth/${AUTH_PATH.LOGIN}`);
  }, [open]);

  // if(isSignedUp) {
  //     setOpen(true);
  // }

  return (
    <Grid container justifyContent="center">
      <BasicModal
        open={open}
        onClickHandler={onResendClick}
        onSuccessClickHandler={onOkClick}
        title={`Thank you for sign up! We have sent a verification email to ${email}.`}
        buttonTitle="Resend email"
        successButtonTitle="OK"
      >
        <div style={{ padding: '30px' }}>
          We sent an email link to complete your registration. Tip: Check your spam folder
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          in case the email was incorrectly identified. Don't receive the email? Click on
          Resend email.
        </div>
      </BasicModal>
      <Paper
        elevation={2}
        sx={{ width: '360px', textAlign: 'center', marginTop: '70px' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <h2 className={styles.title}>Sing up</h2>
            <FormGroup className={styles.formControl}>
              <div className={styles.inputBlock}>
                <AuthInput
                  name="companyName"
                  placeholder="Company name"
                  required
                  errors={errors.companyName && errors.companyName}
                  register={register}
                  minLength={1}
                  maxLength={100}
                  disabled={disabled}
                />
                <AuthInput
                  name="login"
                  placeholder="Login"
                  required
                  errors={errors.login && errors.login}
                  register={register}
                  minLength={3}
                  maxLength={50}
                  disabled={disabled}
                />
              </div>

              <div className={styles.inputBlock}>
                <AuthInput
                  name="email"
                  placeholder="Email"
                  required
                  errors={errors.email && errors.email}
                  register={register}
                  disabled={disabled}
                  pattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  }}
                />
                <AuthInput
                  name="password"
                  placeholder="Password"
                  required
                  errors={errors.password && errors.password}
                  register={register}
                  disabled={disabled}
                  minLength={6}
                  maxLength={30}
                />
                <AuthInput
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  errors={errors.confirmPassword && errors.confirmPassword}
                  register={register}
                  watch={watch}
                  disabled={disabled}
                  minLength={6}
                  maxLength={30}
                />
              </div>
              <Button type="submit" variant="contained" disabled={disabled}>
                SIGN UP
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  );
};
