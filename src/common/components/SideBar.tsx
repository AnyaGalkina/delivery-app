import { FC } from 'react';

import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ADMIN_PATH } from '../enums/enum';

export const SideBar: FC = () => {
  const navigate = useNavigate();

  const itemsList = [
    {
      text: 'Главная',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.MAIN),
    },
    {
      text: 'Сотрудники',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.EMPLOYEES),
    },
    {
      text: 'Блюда',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.EMPLOYEES),
    },
    {
      text: 'Меню',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.EMPLOYEES),
    },
    {
      text: 'Цены',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.PRICES),
    },
    {
      text: 'Отчеты',
      icon: <LocalPizzaIcon />,
      onClick: () => navigate(ADMIN_PATH.REPORTS),
    },
  ];

  return (
    <List>
      {itemsList.map((item) => {
        const { text, icon, onClick } = item;

        return (
          <ListItem button key={`${text}`} onClick={onClick}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
};
