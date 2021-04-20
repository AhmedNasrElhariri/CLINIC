import React, { useState } from 'react';
import { CRButton, CRSelectInput, CRDatePicker } from 'components/widgets';
import axios from 'axios';
import { Form, DatePicker, SelectPicker } from 'rsuite';
import { Container, Report, Name } from './style';
import moment from 'moment';

const initialValue = {
  month: '',
  date: new Date(),
};
const getMonths = () => {
  let dateStart = moment().startOf('year');
  let dateEnd = moment(new Date(), 'YYYY-MM-DD');
  let timeValues = [];

  while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
    let date = { id: '', name: '' };
    date.id = dateStart.toDate();
    date.name = dateStart.format('MMMM-YYYY');
    timeValues.push(date);
    dateStart.add(1, 'month');
  }
  return timeValues;
};
const Test = props => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [formValue, setFormValue] = useState(initialValue);
  let monthes = getMonths();
  const handleMonthlyReport = async month => {
    setLoading(true);
    setError(null);
    let res = null;

    try {
      res = await axios({
        url: `http://localhost:4000/monthly`,
        params: {
          month: moment(month).utc(true).toDate(),
        },
        method: 'GET',
        responseType: 'blob',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      return;
    }

    const data = res.data; // or res.blob() if using blob responses

    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: res.headers['content-type'],
      })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'monthlyReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  const handleDailyReport = async (day) => {
    setLoading(true);
    setError(null);
    let res = null;

    try {
      res = await axios({
        url: 'http://localhost:4000/daily',
        params: {
          day: moment(day).utc(true).toDate(),
        },
        method: 'GET',
        responseType: 'blob',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      return;
    }

    const data = res.data; // or res.blob() if using blob responses

    const url = window.URL.createObjectURL(
      new Blob([data], {
        type: res.headers['content-type'],
      })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dailyReport.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  console.log(monthes);
  return (
    <>
      <Container>
        <Report>
          <Name>Monthly Report</Name>
          <Form formValue={formValue} onChange={setFormValue}>
            <CRSelectInput
              placeholder="Select Month"
              name="month"
              data={monthes}
              layout="inline"
              block
              style={{ width: '270px' }}
            />
          </Form>
          <CRButton onClick={() => handleMonthlyReport(formValue.month)}>
            Generate
          </CRButton>
        </Report>
      </Container>
      <Container>
        <Report>
          <Name>Daily Report</Name>
          <Form formValue={formValue} onChange={setFormValue}>
            <CRDatePicker
              block
              name="date"
              accepter={DatePicker}
              placement="top"
              style={{ width: '270px' }}
            />
          </Form>
          <CRButton onClick={() => handleDailyReport(formValue.date)}>Generate</CRButton>
        </Report>
      </Container>
    </>
  );
};

Test.propTypes = {};

export default Test;
