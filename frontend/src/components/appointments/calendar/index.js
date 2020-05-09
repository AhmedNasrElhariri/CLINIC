import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Calendar, Popover, Whisper } from 'rsuite';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import * as R from 'ramda';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { format } from 'services/date.service';

const AppointmentTime = ({ appointment }) => (
  <Link to={`/appointments/${appointment.id}`}>
    <b>{appointment.time}</b> {appointment.type}
  </Link>
);

function renderCell(list) {
  const displayList = list.filter((_, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((app, index) => (
                <p key={index}>
                  <AppointmentTime appointment={app} />
                </p>
              ))}
            </Popover>
          }
        >
          <Button appearance="link">{moreCount} more</Button>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list no-list-style">
        {displayList.map((app, index) => (
          <li key={index}>
            <Badge /> <AppointmentTime appointment={app} />
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}

function AppointmentCalendar() {
  const { data } = useQuery(LIST_APPOINTMENTS);

  const onRenderCell = useCallback(
    date => {
      if (data && data.appointments) {
        const appointments = R.pipe(
          R.sort((a, b) => a.valueOf() - b.valueOf()),
          R.groupBy(app => moment(app.date).startOf('day')),
          R.prop(moment(date).startOf('day')),
          R.ifElse(
            R.is(Array),
            R.addIndex(R.map)((appointment, idx) => ({
              ...appointment,
              time: format(appointment.date, 'h:mm a'),
            })),
            R.curry(R.always([]))
          )
        )(data.appointments);

        return renderCell(appointments);
      }
      return null;
    },
    [data]
  );

  return (
    <Calendar bordered renderCell={onRenderCell}>
      <h1>We</h1>
    </Calendar>
  );
}

export default AppointmentCalendar;
