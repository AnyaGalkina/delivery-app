import React, { ReactElement } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RoutesPage } from './common/RoutesPage/RoutesPage';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: '#ffcc80',
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Poppins',
    h2: {
      fontFamily: 'Playfair Display',
    },
    h1: {
      fontFamily: 'Playfair Display',
    },
  },
});

const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <RoutesPage />
    </ThemeProvider>
  );
};

export default App;
