import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Img, H6 } from 'components';
import { Container, LinkStyled } from './style';

const items = [
  {
    name: 'Clinic Information',
    icon: '/icons/clinic.png',
    path: '/settings/appointment',
  },
  {
    name: 'Static Info',
    icon: '/icons/static.png',
    path: '/settings/static',
  },
  {
    name: 'Accounting',
    icon: '/icons/static.png',
    path: '/settings/accounting',
  },
  {
    name: 'Snippets',
    icon: '/icons/snippets.png',
    path: '/snippets',
  },
  {
    name: 'Permissions',
    icon: '/icons/snippets.png',
    path: '/permissions',
  },
  {
    name: 'Logout',
    icon: '/icons/logout.png',
    action: 'onLogout',
  },
];

const Item = ({ name, icon, path, onClick }) => {
  return (
    <LinkStyled to={path} onClick={onClick}>
      <Img src={icon} width={40} height={40} />
      <H6 ml={20}>{name}</H6>
    </LinkStyled>
  );
};

export default function Settings({ onClose, ...props }) {
  const history = useHistory();

  return (
    <Container>
      {items.map(({ path, action, ...item }, idx) => (
        <Item
          key={idx}
          path={path}
          {...item}
          onClick={() => {
            action ? props[action]() : history.push(path);
            onClose();
          }}
        />
      ))}
    </Container>
  );
}
