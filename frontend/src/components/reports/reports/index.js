import React from 'react';
import * as R from 'ramda';
import * as moment from 'moment';
import LineChart from '@rsuite/charts/lib/charts/LineChart';
import PieChart from '@rsuite/charts/lib/charts/PieChart';
import BarChart from '@rsuite/charts/lib/charts/BarChart';
import Bars from '@rsuite/charts/lib/series/Bars';
import YAxis from '@rsuite/charts/lib/components/YAxis';

import { Div, MainContainer } from 'components';
import useFetchAppointments from 'hooks/fetch-appointments';
import { Can } from 'components/user/can';

const groupByAge = R.groupBy(({ age }) =>
  age <= 10
    ? '1-10'
    : age <= 20
    ? '11-20'
    : age <= 30
    ? '21-30'
    : age <= 40
    ? '31-40'
    : age <= 50
    ? '41-50'
    : age <= 60
    ? '51-60'
    : age <= 70
    ? '61-70'
    : age <= 80
    ? '71-80'
    : age <= 90
    ? '81-90'
    : '91-100'
);

const groupByMoths = R.groupBy(appointment =>
  moment(appointment.date).format('MMM')
);

function Reports() {
  const { appointments } = useFetchAppointments();

  const appointmentsByMonth = R.pipe(
    R.sortBy(R.prop('date')),
    groupByMoths,
    R.map(R.length),
    R.toPairs
  )(appointments);

  const genderData = R.pipe(
    R.uniqBy(R.path(['patient', 'id'])),
    R.map(R.path(['patient', 'sex'])),
    R.groupBy(R.identity),
    R.map(R.length),
    R.toPairs
  )(appointments);

  const ageData = R.pipe(
    R.uniqBy(R.path(['patient', 'id'])),
    R.map(R.path(['patient'])),
    R.sortBy(R.prop('age')),
    groupByAge,
    R.map(R.length),
    R.toPairs
  )(appointments);

  return (
    <>
      <Can I="view" an="Report">
        <MainContainer title="Statistical Reports" nobody></MainContainer>
        <Div maxWidth={800}>
          <LineChart name="No of patients" data={appointmentsByMonth} />
          <PieChart
            name="Genders"
            data={genderData}
            legend={false}
            startAngle={210}
          />
          <BarChart name="Age" data={ageData}>
            <YAxis />
            <Bars />
          </BarChart>
        </Div>
      </Can>
    </>
  );
}

export default Reports;
