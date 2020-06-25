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

export default function Settings({ onClose, ...props }) {
  const history = useHistory();
  const handleKeyPress = useCallback(
    event => {
      if (event.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [handleKeyPress]);

  return (
    <Container onKeyPress={handleKeyPress}>
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
