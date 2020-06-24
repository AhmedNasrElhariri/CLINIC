import React from 'react';

import { Img, H6, Div } from 'components';

import { Container, LinkStyled } from './style';

const items = [
  {
    name: 'Clinic Information',
    icon: '/icons/clinic.png',
    path: '',
  },
  {
    name: 'Static Data',
    icon: '/icons/static.png',
    path: '',
  },
  {
    name: 'Snippets',
    icon: '/icons/snippets.png',
    path: 'snippets.png',
  },
  {
    name: 'Logout',
    icon: '/icons/logout.png',
    path: '/logout.png',
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

export default function Settings({ open, ...props }) {
  return (
    <>
      {open && (
        <Container>
          {items.map((item, idx) => (
            <Item key={idx} {...item} onClick={props[item.action]} />
          ))}
        </Container>
      )}
    </>
  );
}
