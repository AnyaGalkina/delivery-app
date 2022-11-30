// import { useEffect } from 'react';
//
// import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import App from '../../App';
// import { useAppDispatch, RootState } from '../../app';
// import {  } from '../../app';
import { Employees } from '../../features/admin/employees/Employees';
import { Main } from '../../features/admin/main/Main';
import { Prices } from '../../features/admin/prices/Prices';
import { Reports } from '../../features/admin/reports/Reports';
import { SignUp, Login } from '../../features/auth';
import { SignUpConfirmation } from '../../features/auth/signUp/confirmation/SignUpConfirmation';
import { Layout } from '../components/Layout';
import { ADMIN_PATH, AUTH_PATH } from '../enums/enum';
import { ReturnComponentType } from '../types/ReactComponentType';

export const RoutesPage = (): ReturnComponentType => {
  // const dispatch = useAppDispatch();
  // const accessToken = useSelector<RootState, string>((state) => state.auth.accessToken);
  // const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);

  const authRoutes = [
    { path: AUTH_PATH.LOGIN, component: <Login /> },
    { path: AUTH_PATH.REGISTRATION, component: <SignUp /> },
    { path: AUTH_PATH.REGISTRATION_CONFIRMATION, component: <SignUpConfirmation /> },
    { path: AUTH_PATH.FORGOT_PASSWORD, component: <App /> },
    { path: `${AUTH_PATH.CREATE_NEW_PASSWORD}`, component: <App /> },
  ];
  const adminRoutes = [
    { path: ADMIN_PATH.MAIN, component: <Main /> },
    { path: ADMIN_PATH.EMPLOYEES, component: <Employees /> },
    { path: ADMIN_PATH.PRICES, component: <Prices /> },
    { path: ADMIN_PATH.REPORTS, component: <Reports /> },
  ];

  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(checkAuth());
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to={`/auth/${AUTH_PATH.LOGIN}`} />} />
        {adminRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Route>
      <Route path="/auth">
        {authRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Route>
      <Route path="*" element={<p>there is no route</p>} />
    </Routes>
  );
};
