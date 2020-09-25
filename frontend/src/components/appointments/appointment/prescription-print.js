import React from 'react';
import * as R from 'ramda';

import { formatDate } from 'utils/date';
import { Div } from 'components/widgets/html';

import { PrescriptionSyled, PrescriptionContentSyled } from './style';

const Info = ({ name, value }) => (
  <div className="info">
    <div className="name">
      {name}
      {'  '}:
    </div>
    <div className="value">{value}</div>
  </div>
);

const PrescriptionPrint = React.forwardRef(
  ({ content, name, age, clinicInfo }, ref) => {
    const logoURL = R.path(['logo', 'url'])(clinicInfo);

    return (
      <Div height={0} overflow="hidden">
        <PrescriptionSyled ref={ref}>
          <Div display="flex" justifyContent="space-between">
            <Div className="header">
              <Info name="Date" value={formatDate(new Date())} />
              <Info name="Name" value={name} />
              <Info name="Age" value={age} />
            </Div>
            {logoURL && (
              <img
                src={logoURL}
                width={75}
                height={75}
                alt=""
                className="logo"
              />
            )}
          </Div>
          <PrescriptionContentSyled className="content-container">
            <Div className="body">
              <img src="/rx.png" alt="rx" className="rx" />
              <p>{content}</p>
            </Div>
            <Div className="footer">
              <p>
                <b>Tel: </b> {clinicInfo.phoneNo}
              </p>
              <p>
                <b>Address: </b>
                {clinicInfo.address}
              </p>
            </Div>
          </PrescriptionContentSyled>
        </PrescriptionSyled>
      </Div>
    );
  }
);

export default PrescriptionPrint;
