import React, { memo, useCallback, useEffect, useState } from 'react';
import { CRRadio, CRSelectInput, CRTextInput, Div } from 'components';
import Label from '../label';
import CRTable from '../table';
import {
  RADIO_FIELD_TYPE,
  SELECTOR_FIELD_TYPE,
  TEXT_FIELD_TYPE,
} from 'utils/constants';
import { GridStyled } from './style';

const renderField = ({ id, type, choices, ...props }) => {
  switch (type) {
    case TEXT_FIELD_TYPE:
      return <CRTextInput label="" name={id} {...props} />;
    case SELECTOR_FIELD_TYPE:
      return <CRSelectInput block label="" name={id} {...props} />;
    case RADIO_FIELD_TYPE:
      return <CRRadio label="" name={id} options={choices} {...props} inline />;
    default:
      return null;
  }
};

const TableWithInput = ({ label, name, choices, value, ...rest }) => {
  const [formValue, setFormValue] = useState([]);
  // console.log({ label, name, choices });
  const generateRow = useCallback(() => {
    const result = choices.reduce(
      (acc, { name }) => ({ ...acc, [name]: '' }),
      // (acc, field) => ({ ...acc, [field.id]: { field, value: '' } }),
      {}
    );
    console.log(result);
    return result;
  }, [choices]);

  useEffect(() => {
    setFormValue([...(value || []), generateRow()]);
  }, []);

  return (
    <GridStyled>
      <div class="grid-container">
        {choices.map((choice, index) => (
          <div key={index} class="grid-item">
            {choice.name}
          </div>
        ))}

        {/* <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div> */}
      </div>
      {/* <Label>{label}</Label>
      <CRTable height={70} data={formValue} cellBordered>
        {choices.map((choice, index) => (
          <CRTable.CRColumn width={250}>
            <CRTable.CRHeaderCell>{choice.name}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" semiBold>
              {item => renderField(choices[index])}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        ))}

        <CRTable.CRColumn width={35}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell></CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable> */}
    </GridStyled>
  );
};

export default memo(TableWithInput);
