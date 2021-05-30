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
  const [dataTwo,setDataTwo] = useState({});
  let monthes = getMonths();
  const handleMonthlyReport = async month => {
    setLoading(true);
    setError(null);
    axios({
        url: `/monthly`,
        params: {
          month: moment(month).toDate(),
        },
        method: 'GET',
    }).then(res => {
      setDataTwo(res.data);
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
    // link.setAttribute('download', 'monthlyReport.pdf');
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);
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
  const refTwo = useRef();
  let monthlyData = dataTwo?.data || [];
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
          <ReactToPrint
            trigger={() => <CRButton primary>Print</CRButton>}
            content={() => refTwo.current}
          />
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
      <Div>
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <CRCard ref={refTwo} borderless>
            <Div>monthName: {dataTwo.monthName}</Div>
            <Div>numOfCourses: {dataTwo.numOfCourses}</Div>
            <Div>numOfExamination: {dataTwo.umOfExamination}</Div>
            <Div>Number Of Followup: {dataTwo.numOfFollowup}</Div>
            <Div>Number Of Sessions: {dataTwo.numOfSession}</Div>
            <Div>totalExpenses: {dataTwo.totalExpenses}</Div>
            <Div>totalRevenues:{dataTwo.totalRevenues}</Div>
            <Div>totalSales: {dataTwo.totalSales}</Div>
            <CRTable autoHeight data={monthlyData}>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Before</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ before }) => (
                    <CRTable.CRCellStyled bold>{before}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>After</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ after }) => (
                    <CRTable.CRCellStyled bold>{after}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Date </CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ date }) => (
                    <CRTable.CRCellStyled bold>{date}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Difference</CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ diff }) => (
                    <CRTable.CRCellStyled bold>{diff}</CRTable.CRCellStyled>
                  )}
                </CRTable.CRCell>
              </CRTable.CRColumn>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Number of Pulses </CRTable.CRHeaderCell>
                <CRTable.CRCell>
                  {({ numOfPulses }) => (
                    <CRTable.CRCellStyled bold>{numOfPulses}</CRTable.CRCellStyled>
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
