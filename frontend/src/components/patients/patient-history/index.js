import React from 'react';
import { Divider, Panel } from 'rsuite';
import * as R from 'ramda';
import { capitalize } from 'utils/text';

import { Div } from 'components';
import { KeyStyled, ValueStyled } from 'components/misc';
import { formatDate } from 'utils/date';

export default function PatientHistory({ history }) {
  const renderProp = (key, value) => {
    return (
      <Div display="flex" alignItems="center" lineHeight={2.2}>
        <KeyStyled width="150px">{capitalize(key)}</KeyStyled>
        <Divider vertical />
        <ValueStyled>{value}</ValueStyled>
      </Div>
    );
  };

  const renderAppointment = data => {
    return data.map(({ value, field }, idx) => (
      <React.Fragment key={idx}>{renderProp(field.name, value)}</React.Fragment>
    ));
  };

  return (
    <>
      {history.length ? (
        history.map(({ data, date }, i) => (
          <Div mb={3} key={i}>
            <Panel header={`No ${i + 1}`} bordered>
              {renderProp('Date', formatDate(date))}
              {renderAppointment(data)}
            </Panel>
          </Div>
        ))
      ) : (
        <h4>No History</h4>
      )}
    </>
  );
}
