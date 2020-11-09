import React from 'react';
import * as R from 'ramda';

import { formatDate } from 'utils/date';
import { Div, H6 } from 'components';

import {
  PrescriptionSyled,
  PrescriptionContentSyled,
  PatientInfoStyled,
  PatientContainerStyled
} from './style';

const PatientInfo = ({ name, value }) => (
  <PatientInfoStyled>
    <div className="name">
      {name}
      {'  '}:
    </div>
    <div className="value">{value}</div>
  </PatientInfoStyled>
);

const PrescriptionPrint = React.forwardRef(
  ({ content, name, age, clinicInfo }, ref) => {
    const logoURL = R.path(['logo', 'url'])(clinicInfo);

    return (
      <Div height={0} overflow="hidden">
        <PrescriptionSyled ref={ref}>
          <Div display="flex" justifyContent="space-between">
            <Div className="header" textAlign="center">
              <H6>{clinicInfo.doctorTitle}</H6>
              <H6>{clinicInfo.doctorName}</H6>
              <H6>{clinicInfo.doctorJobDescription}</H6>
            </Div>
            <Div>
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

            <Div className="header" textAlign="center">
              <H6>{clinicInfo.doctorTitleAr}</H6>
              <H6>{clinicInfo.doctorNameAr}</H6>
              <H6>{clinicInfo.doctorJobDescriptionAr}</H6>
            </Div>
          </Div>
          <PrescriptionContentSyled className="content-container">
            <PatientContainerStyled>
              <PatientInfo name="Date" value={formatDate(new Date())} />
              <PatientInfo name="Name" value={name} />
              <PatientInfo name="Age" value={age} />
            </PatientContainerStyled>
            <Div className="body">
              <img src="/rx.png" alt="rx" className="rx" />
              <p>{content}</p>
            </Div>
            <Div className="footer">
              <p>
                <b>Tel: </b> {clinicInfo.phoneNo} - {clinicInfo.phoneNo1}
              </p>
              <p>
                <b>Address: </b>
                {clinicInfo.address}
              </p>
              <p>
                <b>Address 2: </b>
                {clinicInfo.address1}
              </p>
            </Div>
          </PrescriptionContentSyled>
        </PrescriptionSyled>
      </Div>
    );
  }
);

export default PrescriptionPrint;
