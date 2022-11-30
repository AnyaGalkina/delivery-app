import axios, { AxiosResponse } from 'axios';

import { AUTH_PATH } from '../../common';

const instance = axios.create({
  baseURL: 'https://server-deliv-8lx4l4dvh-alexsandr3.vercel.app/',
});

export const authAPI = {
  signUp(params: SignUpType): Promise<AxiosResponse> {
    return instance.post<SignUpType, AxiosResponse>(
      `/auth/${AUTH_PATH.REGISTRATION}`,
      params,
    );
  },
  resendConfirmationCode(params: { email: string }): Promise<AxiosResponse> {
    return instance.post<{ email: string }, AxiosResponse>(
      `/auth/${AUTH_PATH.REGISTRATION_EMAIL_RESENDING}`,
      params,
    );
  },
  confirmRegistration(params: CodeConfirmationType): Promise<AxiosResponse> {
    return instance.post<CodeConfirmationType, AxiosResponse>(
      `/auth/${AUTH_PATH.REGISTRATION_CONFIRMATION}`,
      params,
    );
  },
  logIn(params: LogInType): Promise<AxiosResponse<LogInRes>> {
    return instance.post<LogInType, AxiosResponse<LogInRes>>(
      `/auth/${AUTH_PATH.LOGIN}`,
      params,
    );
  },
};

// instance.interceptors.request.use((config): AxiosRequestConfig => {
//   // @ts-ignore
//   config.headers.Authorization = `Authorization token ${localStorage.getItem(
//     'accessToken',
//   )}`;
//
//   return config;
// });
//
// instance.interceptors.response.use(
//   (config): AxiosResponse => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await refreshTokenAPI.refreshToken();
//
//         localStorage.setItem('accessToken', response.data.accessToken);
//
//         return instance.request(originalRequest);
//       } catch (error) {
//         console.log('Non-authorized');
//       }
//     }
//     throw error;
//   },
// );
//
// export const refreshTokenAPI = {
//   refreshToken(): Promise<AxiosResponse<LogInRes>> {
//     return axios.post(
//       'https://server-deliv-f5cwzolpc-alexsandr3.vercel.app/auth/refresh-token',
//       { withCredentials: true },
//     );
//   },
// };

export type SignUpType = {
  companyName: string;
  login: string;
  email: string;
  password: string;
};

export type LogInType = {
  login: string;
  password: string;
};

export type LogInRes = {
  accessToken: string;
};
export type CodeConfirmationType = {
  code: string;
};
