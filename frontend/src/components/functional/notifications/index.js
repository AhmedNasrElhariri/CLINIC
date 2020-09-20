import React from 'react';

import { H4, H7, Div } from 'components';
import { Container, NotificationStyled } from './style';
import { H6 } from 'components/widgets';

const NotificationBody = ({ body, date }) => {

  return (
    <NotificationStyled>
      <H7 mx={15}>{body}</H7>
      {/* <H7>&nbsp;at&nbsp;</H7>
      <H7 fontWeight={800}>{formatDate(date, 'HH:mm a')}</H7> */}
    </NotificationStyled>
  );
};

const Notifications = ({ onClose, onClear, notifications, ...props }) => {
  return (
    <Container>
      <Div
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        p={4}
      >
        <H4>Notifications</H4>
        <H6
          onClick={onClear}
          variant="primary"
          fontWeight={600}
          cursor="pointer"
        >
          Clear
        </H6>
      </Div>
      {notifications.map((item, idx) => (
        <NotificationBody
          key={idx}
          body={item.message}
          onClick={props[item.action]}
        />
      ))}
    </Container>
  );
};

Notifications.defaultProps = {
  notifications: [],
};

export default Notifications;
