import React from 'react';
import { useHistory } from 'react-router-dom';

import { Img, H6, Div } from 'components';
import { Container, LinkStyled } from './style';
import { Can } from 'components/user/can';
import {  get } from 'services/local-storage';
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
  const dir = get('dir');
  let right = '30px';
  dir === 'ltr' ?  right = '30px' : right = '-480px';
  const items = [
    {
      name: 'Configurations',
      icon: '/icons/config.png',
      path: '/settings/configurations',
    },
    {
      name: 'Static Info',
      icon: '/icons/static.png',
      path: '/settings/static',
    },

    {
      name: 'Payroll',
      icon: '/icons/static.png',
      path: '/payroll',
    },

    {
      name: 'Snippets',
      icon: '/icons/snippets.png',
      path: '/snippets',
    },
    {
      name: 'Inventory',
      icon: '/icons/static.png',
      path: '/inventory',
    },
    {
      name: 'Logout',
      icon: '/icons/logout.png',
      action: 'onLogout',
    },
  ];

  return (
    <Container right={right}>
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
