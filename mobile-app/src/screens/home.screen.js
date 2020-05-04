import React from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { NAVIGATIONS } from '@/utils/constants';

export const HELLO = gql`
  query {
    hello
  }
`;

export default ({ navigation }) => {
  const { data, error, loading } = useQuery(HELLO);
  console.log(data);
  return (
    <Container>
      <Content>
        <Grid>
          <Col>
            <Button
              full
              primary
              style={{ height: 130 }}
              onPress={() => navigation.navigate(NAVIGATIONS.NEW_APPOINTMENT)}>
              <Text>New Appointment</Text>
            </Button>
            <Button
              full
              danger
              style={{ height: 130 }}
              onPress={() =>
                navigation.navigate(NAVIGATIONS.TODAY_APPOINTMENTS)
              }>
              <Text>Today Appointments</Text>
            </Button>
          </Col>
          <Col>
            <Button
              full
              light
              style={{ height: 130 }}
              onPress={() => navigation.navigate(NAVIGATIONS.NEW_PATIENT)}>
              <Text>New Patient</Text>
            </Button>
            <Button
              full
              success
              style={{ height: 130 }}
              onPress={() => navigation.navigate(NAVIGATIONS.CALENDAR)}>
              <Text>Calendar</Text>
            </Button>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};
