import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
  Table,
  DateRangePicker,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Row,
  Col,
  Input,
  SelectPicker,
} from 'rsuite';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { formatDate } from 'utils/date';
import { filterAppointments, appointmentTypes } from 'services/appointment';
import { Div } from 'components';

const fetchedAppointmetns = data => R.propOr([], 'appointments')(data);

function Appointments() {
  const history = useHistory();
  const [formValue, setFormValue] = useState({ date: [], name: '' });
  const [appointments, setAppointments] = useState([]);

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {},
  });

  useEffect(() => {
    const appointments = fetchedAppointmetns(data);
    setAppointments(filterAppointments(appointments, formValue));
  }, [data, formValue]);

  return (
    <>
      <Div mb={4}>
        <Form formValue={formValue} onChange={setFormValue} fluid>
          <Row gutter={16}>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Range</ControlLabel>
                <FormControl name="date" accepter={DateRangePicker} block/>
              </FormGroup>
            </Col>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" accepter={Input} />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <FormGroup>
                <ControlLabel>Type</ControlLabel>
                <FormControl
                  name="type"
                  accepter={SelectPicker}
                  defaultValue={0}
                  block
                  cleanable={true}
                  searchable={true}
                  data={appointmentTypes}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Div>
      <Table
        autoHeight
        data={appointments}
        style={{ cursor: 'pointer' }}
        onRowClick={({ id }) => {
          history.push(`/appointments/${id}`);
        }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell>{({ patient }) => patient.name}</Table.Cell>
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.Cell dataKey="type" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.Cell dataKey="date">
            {({ date }) => formatDate(date)}
          </Table.Cell>
        </Table.Column>
      </Table>
    </>
  );
}

export default Appointments;
