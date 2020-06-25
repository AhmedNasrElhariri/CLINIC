import React from 'react';
import * as R from 'ramda';

import { formatDate } from 'utils/date';
import styled from 'styled-components';
import { Div } from 'components/widgets/html';

const Info = ({ name, value }) => (
  <div className="info">
    <div className="name">
      {name}
      {'  '}:
    </div>
    <div className="value">{value}</div>
  </div>
);

const PrescriptionSyled = styled.div`
  @media screen {
    display: none;
  }

  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 18px;

  & .info {
    display: flex;
    line-height: 35px;
  }

  & .name {
    width: 80px;
    text-align: right;
    font-weight: bold;
  }

  & .value {
    flex-grow: 1;
    margin-left: 20px;
  }

  & .content-container {
    flex-grow: 1;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 15px;
    padding-left: 14px;
    display: flex;
    flex-direction: column;
  }

  & .body {
    flex-grow: 1;
    & p {
      padding-left: 40px;
      padding-right: 20px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
  }

  & .footer {
    padding: 20px;
    border-top: 1px solid #eeeeee;
  }

  & .rx {
    width: 60px;
    height: 60px;
    display: block;
  }

  & .logo {
    border-radius: 4px;
  }
`;

const PrescriptionPrint = React.forwardRef(
  ({ content, name, age, clinicInfo }, ref) => {
    const logoUlr = R.path(['logo', 'url'])(clinicInfo);
    return (
      <PrescriptionSyled ref={ref}>
        <Div display="flex" justifyContent="space-between">
          <div className="header">
            <Info name="Date" value={formatDate(new Date())} />
            <Info name="Name" value={name} />
            <Info name="Age" value={age} />
          </div>
          <img src={logoUlr} width={75} height={75} alt="" className="logo" />
        </Div>
        <div className="content-container">
          <div className="body">
            <img src="/rx.png" alt="rx" className="rx" />
            <p>{content}</p>
          </div>
          <div className="footer">
            <p><b>Tel: </b> {clinicInfo.phoneNo}</p>
            <p><b>Address: </b>{clinicInfo.address}</p>
          </div>
        </div>
      </PrescriptionSyled>
    );
  }
);

export default PrescriptionPrint;
