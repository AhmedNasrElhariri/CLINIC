import React from 'react';
import * as R from 'ramda';
import { Div, CRDivider } from 'components';
import { formatDate } from 'utils/date';
const SessionsPulses = ({ summary }) => {
  console.log(summary, 'SS');
  const sessions = summary.map(s => {
    return {
      date: R.propOr(new Date(), 'date')(s),
      powerOne: R.propOr(0, 'powerOne')(s),
      powerTwo: R.propOr(0, 'powerTwo')(s),
      sessionsPulses: R.propOr([], 'sessionsPulses')(s),
    };
  });
  console.log(sessions, 'SSesions');
  return (
    <>
      <Div ml={20}>
        {sessions.map(
          s => (
            // s?.sessionsPulses.length > 0 && (
            <>
              <Div>{formatDate(s.date)}</Div>
              <Div mt={10} display="flex">
                {s.powerOne !== 0 && (
                  <Div mr={30}>
                    {'Power One :  '}
                    {s.powerOne}
                  </Div>
                )}
                {s.powerTwo !== 0 && (
                  <Div>
                    {'Power Two :  '}
                    {s.powerTwo}
                  </Div>
                )}
              </Div>
              <Div display="flex" mt={10} mb={10}>
                {s?.sessionsPulses?.map(session => (
                  <>
                    <Div mr={10}>
                      {session.name}
                      {': '}
                    </Div>
                    <Div mr={40}>
                      {session.value}
                      {' pulses'}
                    </Div>
                    <CRDivider />
                  </>
                ))}
              </Div>
            </>
          )
          // )
        )}
      </Div>
    </>
  );
};

export default SessionsPulses;
