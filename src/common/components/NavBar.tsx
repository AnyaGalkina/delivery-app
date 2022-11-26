import { FC } from 'react';

import styled from '@emotion/styled';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { AUTH_PATH } from '../enums/enum';

const CustomToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavBar: FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <CustomToolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalPizzaIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontFamily: 'Playfair Display',
            }}
          >
            DELIVERY APP
          </Typography>
        </Box>
        <Button color="inherit" onClick={() => navigate(`/auth/${AUTH_PATH.LOGIN}`)}>
          Login
        </Button>
      </CustomToolbar>
    </AppBar>
  );
};
