import React from 'react';
import { useHistory } from 'react-router-dom';

import { Img, H6, Div } from 'components';
import { Container, LinkStyled } from './style';
import { Can } from 'components/user/can';

const items = [
  {
    name: 'Clinic Information',
    icon: '/icons/clinic.png',
    path: '/settings/clinic',
  },
  {
    name: 'Static Info',
    icon: '/icons/static.png',
    path: '/settings/static',
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
    permission: { actions: 'manage', subject: 'all' },
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
      {items.map(({ path, action, permission, ...item }, idx) => (
        <Div key={idx}>
          {permission ? (
            <Can>
              <Item
                path={path}
                {...item}
                onClick={() => {
                  action ? props[action]() : history.push(path);
                  onClose();
                }}
              />
            </Can>
          ) : (
            <Item
              path={path}
              {...item}
              onClick={() => {
                action ? props[action]() : history.push(path);
                onClose();
              }}
            />
          )}
        </Div>
      ))}
    </Container>
  );
}
