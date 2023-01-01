import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CRButton,
  CRIcon,
  CRRadio,
  CRSelectInput,
  CRTextInput,
  Div,
} from 'components';
import {
  RADIO_FIELD_TYPE,
  SELECTOR_FIELD_TYPE,
  TEXT_FIELD_TYPE,
} from 'utils/constants';
import { GridCell, GridStyled } from './style';
import { Form } from 'rsuite';

const renderField = ({ id, type, choices, ...props }) => {
  switch (type) {
    case TEXT_FIELD_TYPE:
      return <CRTextInput noLabel name={id} block {...props} />;
    case SELECTOR_FIELD_TYPE:
      return <CRSelectInput name={id} noLabel block {...props} />;
    case RADIO_FIELD_TYPE:
      return <CRRadio noLabel name={id} options={choices} {...props} inline />;
    default:
      return null;
  }
};

const TableWithInput = ({ label, name, choices, value, ...rest }) => {
  const [formValue, setFormValue] = useState([]);
  // console.log({ label, name, choices });
  const generateRow = useCallback(() => {
    const result = choices.reduce(
      (acc, { id }) => ({ ...acc, [id]: '' }),
      // (acc, field) => ({ ...acc, [field.id]: { field, value: '' } }),
      {}
    );
    console.log(result);
    return result;
  }, [choices]);

  const normalizedChoices = useMemo(
    () =>
      choices.reduce((acc, choice) => ({ ...acc, [choice.id]: choice }), {}),
    [choices]
  );

  useEffect(() => {
    setFormValue([...(value || []), generateRow(), generateRow()]);
  }, []);

  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <CRButton verysmall mb={2}>
        Add
      </CRButton>
      <GridStyled colsNo={choices.length + 1}>
        {choices.map((choice, index) => (
          <GridCell key={index} height={80}>
            {choice.name}
          </GridCell>
        ))}
        <GridCell></GridCell>
        {formValue.map((value, index) => (
          <>
            {Object.entries(value).map(([id, value]) => (
              <GridCell key={id + index}>
                <Div width="100%">{renderField(normalizedChoices[id])}</Div>
              </GridCell>
            ))}
            <GridCell>
              <CRIcon icon="trash-o" variant="danger" onClick={() => {}} />
            </GridCell>
          </>
        ))}
      </GridStyled>
    </Form>
  );
};

export default memo(TableWithInput);
