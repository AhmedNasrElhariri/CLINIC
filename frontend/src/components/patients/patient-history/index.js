import React from 'react';
import { Divider, Panel } from 'rsuite';
import * as R from 'ramda';
import { capitalize } from 'utils/text';

import { Div } from 'components';
import { KeyStyled, ValueStyled } from 'components/misc';
import { formatDate } from 'utils/date';

export default function PatientHistory({ history }) {
  const props = [
    { name: 'type' },
    { name: 'date', value: val => formatDate(val) },
    { name: 'complain' },
    { name: 'signs' },
    { name: 'diagnosis' },
    { name: 'treatment' },
    { name: 'recommendations' },
  ];

  const keys = R.map(R.prop('name'))(props);

  const renderProp = (key, value) => (
    <Div display="flex" alignItems="center" lineHeight={2.2}>
      <KeyStyled width="150px">{capitalize(key)}</KeyStyled>
      <Divider vertical />
      <ValueStyled>{value}</ValueStyled>
    </Div>
  );

  const renderAppointment = appointment => {
    console.log(R.pick(keys)(appointment));
    return Object.keys(R.pick(keys)(appointment)).map((key, idx) => (
      <React.Fragment key={idx}>
        {renderProp(
          key,
          R.isNil(props[idx].value)
            ? appointment[key]
            : props[idx].value(appointment[key])
        )}
      </React.Fragment>
    ));
  };

  return (
    <>
      {history.map((appointment, i) => (
        <Div mb={3} key={i}>
          <Panel header={`No ${i + 1}`} bordered>
            {renderAppointment(appointment)}
          </Panel>
        </Div>
      ))}
    </>
  );
}
