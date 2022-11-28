import axios, { AxiosResponse } from 'axios';

import { AUTH_PATH } from '../../common/enums/enum';

const instance = axios.create({
  baseURL: 'https://server-deliv-f5cwzolpc-alexsandr3.vercel.app/',
});

export const authAPI = {
  signUp(params: SignUpType) {
    return instance.post<SignUpType, AxiosResponse>(
      `/auth/${AUTH_PATH.REGISTRATION}`,
      params,
    );
  },
  logIn(params: LogInType) {
    return instance.post<LogInType, AxiosResponse<LogInRes>>(
      `/auth/${AUTH_PATH.LOGIN}`,
      params,
    );
  },
};

export type SignUpType = {
  nameCompany: string;
  login: string;
  email: string;
  password: string;
};

export type LogInType = {
  login?: string;
  email?: string;
  password: string;
};

export type LogInRes = {
  accessToken: string;
};
