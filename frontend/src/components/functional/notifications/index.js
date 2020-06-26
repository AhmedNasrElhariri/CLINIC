import React, { useCallback, useEffect } from 'react';

import { H4, H7 } from 'components';
import { Container, NotificationStyled } from './style';
import { formatDate } from 'utils/date';

const items = [
  {
    body: 'New Appointment',
    date: new Date(),
  },
  {
    body: 'Appointment has been cancelled',
    date: new Date(),
  },
  {
    body: 'Logout',
    date: new Date(),
  },
];

const NotificationBody = ({ body, date }) => {
  return (
    <NotificationStyled>
      <H7 ml={20}>{body}</H7>
      <H7>&nbsp;at&nbsp;</H7>
      <H7 fontWeight={800}>{formatDate(date, 'HH:mm a')}</H7>
    </NotificationStyled>
  );
};

export default function Settings({ onClose, ...props }) {
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
      <H4 ml={4} mt={4}>
        Notifications
      </H4>
      {items.map((item, idx) => (
        <NotificationBody key={idx} {...item} onClick={props[item.action]} />
      ))}
    </Container>
  );
}
