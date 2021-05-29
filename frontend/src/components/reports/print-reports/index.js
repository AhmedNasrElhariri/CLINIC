import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CRButton, CRSelectInput, CRDatePicker, Div ,CRCard, CRTable} from 'components/widgets';
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
    date.id = dateStart.toISOString();
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
  const [data, setData] = useState([]);
  let monthes = getMonths();
  const handleMonthlyReport = async month => {
    setLoading(true);
    setError(null);
    let res = null;
    try {
      res = await axios({
        url: `/monthly`,
        params: {
          month: moment(month).toDate(),
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
  const handleDailyReport = async day => {
    setLoading(true);
    setError(null);
    let res = null;

    axios({
      url: 'http://localhost:4000/daily',
      params: {
        day: moment(day).toDate(),
      },
      method: 'GET',
    })
      .then(res => {
        setData(res.data.output);
      })
      .catch(err => {
        console.log(err);
      });

    // const data = res.data; // or res.blob() if using blob responses

    // const url = window.URL.createObjectURL(
    //   new Blob([data], {
    //     type: res.headers['content-type'],
    //   })
    // );
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'dailyReport.pdf');
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);
  };
  const refOne = useRef();
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
              style={{ width: '270px' }}
            />
          </Form>
          <CRButton onClick={() => handleDailyReport(formValue.date)}>
            Generate
          </CRButton>
          <ReactToPrint
            trigger={() => <CRButton primary>Print</CRButton>}
            content={() => refOne.current}
          />
        </Report>
      </Container>
      <Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <CRCard ref={refOne} borderless>
            <CRTable autoHeight data={data}>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Doctor Name</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ doctor }) => (
                    <CRTable.CRCellStyled bold>{doctor}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Patient Name</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ patient }) => (
                    <CRTable.CRCellStyled bold>{patient}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Power One </CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ powerOne }) => (
                    <CRTable.CRCellStyled bold>{powerOne}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Power Two</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ powerTwo }) => (
                    <CRTable.CRCellStyled bold>{powerTwo}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Pulses</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ pulses }) => (
                    <CRTable.CRCellStyled bold>{pulses}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
            </CRTable>
          </CRCard>
        </Div>
      </Div>
    </>
  );
};

Test.propTypes = {};

export default Test;
