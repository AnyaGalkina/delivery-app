import React, { ReactElement } from 'react';

import { TextField } from '@mui/material';
import { FieldError, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { LogInType } from '../../../features/auth';
import { SignUpFormData } from '../../../features/auth/signUp/SignUp';

import styles from './AuthInput.module.css';

type PropsType = {
  name: keyof SignUpFormData;
  placeholder: string;
  errors?: FieldError | undefined;
  register: UseFormRegister<SignUpFormData> | UseFormRegister<LogInType>;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  pattern?: any;
  watch?: UseFormWatch<SignUpFormData>;
};

export const AuthInput = ({
  disabled,
  errors,
  minLength,
  watch,
  maxLength,
  name,
  register,
  placeholder,
  pattern,
}: PropsType): ReactElement => {
  return (
    <div>
      <TextField
        className={styles.input}
        label={placeholder}
        variant="outlined"
        disabled={disabled}
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
          pattern,
        })}
      />
      <div className={styles.error}>{errors ? <span>{errors.message}</span> : ''}</div>
    </div>
  );
};
