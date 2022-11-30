import { FC } from 'react';

import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { NavBar } from './NavBar';
import { SideBar } from './SideBar';

export const Layout: FC = () => {
  return (
    <Grid container sx={{ width: '60vw', m: 'auto' }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <main>
          <Outlet />
        </main>
      </Grid>
    </Grid>
  );
};
