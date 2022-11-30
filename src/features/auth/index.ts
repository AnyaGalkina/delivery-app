export { SignUp } from './signUp';
export { Login } from './login';
export { authAPI } from './authAPI';
export type { SignUpType, LogInType, CodeConfirmationType } from './authAPI';
export {
  signUp,
  logIn,
  authReducer,
  // checkAuth,
  resendConfirmationCode,
  sendConfirmationCode,
} from './auth-reducer';
