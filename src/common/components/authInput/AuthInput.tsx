import React, { ReactElement } from 'react';

import { TextField } from '@mui/material';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { LogInType } from '../../../features/auth/authAPI';
import { SignUpFormData } from '../../../features/auth/signUp/SignUp';
// import {SignInFormData} from '../../../features/auth/login/Login';

import styles from './AuthInput.module.css';

type PropsType = {
  name: keyof SignUpFormData;
  placeholder: string;
  errors?: any;
  register: UseFormRegister<SignUpFormData> | UseFormRegister<LogInType>;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disable?: boolean;
  watch?: UseFormWatch<SignUpFormData>;
};

export const AuthInput = ({
  disable,
  errors,
  minLength,
  watch,
  maxLength,
  name,
  register,
  placeholder,
}: PropsType): ReactElement => {
  return (
    <div>
      <TextField
        className={styles.input}
        label={placeholder}
        variant="outlined"
        disable={disable}
        // @ts-ignore
        {...register(name, {
          required: { value: true, message: 'This is required' },
          maxLength: {
            value: maxLength,
            message: `Max length exceeded, ${maxLength} symbols`,
          },
          minLength: { value: minLength, message: `Minimum length ${minLength} symbols` },
          validate: (value: string) => {
            if (watch && watch('password') !== value) {
              return 'Your passwords do no match';
            }
          },
        })}
      />
      <div className={styles.error}>{errors ? <span>{errors.message}</span> : ''}</div>
    </div>
  );
};
