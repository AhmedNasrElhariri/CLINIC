import React from 'react';
import { formatDate } from 'utils/date';
import styled from 'styled-components';

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

  & .body {
    flex-grow: 1;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 15px;
    padding-left: 14px;

    & p {
      padding-left: 40px;
      padding-right: 20px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
  }

  & img {
    width: 60px;
    display: block;
  }
`;

const PrescriptionPrint = React.forwardRef(({ content, name, age }, ref) => {
  return (
    <PrescriptionSyled ref={ref}>
      <div className="header">
        <Info name="Date" value={formatDate(new Date())} />
        <Info name="Name" value={name} />
        <Info name="Age" value={age} />
      </div>
      <div className="body">
        <img src="/rx.png" alt="rx" />
        <p>{content}</p>
      </div>
    </PrescriptionSyled>
  );
});

export default PrescriptionPrint;
