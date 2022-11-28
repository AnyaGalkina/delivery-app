import React, { ReactElement, useState } from 'react';

import { FormControl, FormGroup, Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { AppStatusType } from '../../../app/app-reducer';
import { useAppDispatch } from '../../../app/hooks';
import { RootState } from '../../../app/store';
// eslint-disable-next-line import/order
import { AuthInput } from '../../../common/components/authInput/AuthInput';

// import {useNavigate} from 'react-router-dom';

import { BasicModal } from '../../../common/components/modal/BasicModal';
import { signUp } from '../auth-reducer';

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

  const [open, setOpen] = useState(false);
  // const [data, setData] = useState<SignUpFormData>();
  const appStatus = useSelector<RootState, AppStatusType>((state) => state.app.appStatus);

  // const navigate = useNavigate();
  //
  // const isSignedUp = useSelector<RootState, boolean>((state) => state.auth.isSignedUp);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const disable = appStatus === 'loading';

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, login, password, companyName } = data;

    // setData(data);
    // console.log(data);
    dispatch(signUp({ email, login, password, nameCompany: companyName }));
    setOpen(true);
    reset();
  };

  const onResentClick = (): void => {
    // const { email, login, password, companyName } = data;
    //
    // dispatch(signUp({ email, login, password, nameCompany: companyName }));
    setOpen(false);
  };

  const onOkClick = (): void => {
    setOpen(false);
  };

  return (
    <Grid container justifyContent="center">
      <BasicModal
        open={open}
        onClickHandler={onResentClick}
        onSuccessClickHandler={onOkClick}
        title="Welcome to our team! Check your email to finish registration."
        buttonTitle="Resent confirmation code"
        successButtonTitle="OK"
      />
      <Paper
        elevation={2}
        style={{ width: '360px', textAlign: 'center', marginTop: '70px' }}
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
                  minLength={3}
                  maxLength={100}
                  disable={disable}
                />
                <AuthInput
                  name="login"
                  placeholder="Login"
                  required
                  errors={errors.login && errors.login}
                  register={register}
                  minLength={3}
                  maxLength={50}
                  disable={disable}
                />
              </div>

              <div className={styles.inputBlock}>
                <AuthInput
                  name="email"
                  placeholder="Email"
                  required
                  errors={errors.email && errors.email}
                  register={register}
                  disable={disable}
                />
                <AuthInput
                  name="password"
                  placeholder="Password"
                  required
                  errors={errors.password && errors.password}
                  register={register}
                  disable={disable}
                />
                <AuthInput
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  errors={errors.confirmPassword && errors.confirmPassword}
                  register={register}
                  watch={watch}
                  disable={disable}
                />
              </div>
              <Button type="submit" variant="contained">
                SIGN UP
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  );
};
