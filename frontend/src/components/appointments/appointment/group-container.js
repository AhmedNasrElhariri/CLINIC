import React, { useCallback, useState, useMemo } from 'react';
import { Form, IconButton, Icon } from 'rsuite';
import styled from 'styled-components';
import {
  Div,
  CRNumberInput,
  CRTextInput,
  CRTextArea,
  CRRadio,
  CRCheckBoxGroup,
  CRButton,
  CRNestedSelector,
  CRMultipleSelector,
  CRSelectInput,
  H3,
} from 'components';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
  RADIO_FIELD_TYPE,
  CHECK_FIELD_TYPE,
  NESTED_SELECTOR_FIELD_TYPE,
  SELECTOR_WITH_INPUT,
  SELECTOR,
} from 'utils/constants';

const CellDiv = styled.div`
  width: 100px;
  border: 2px solid gray;
  margin: 3px;
  height: 50px;
  @media only screen and (max-width: 991px) {
    width: 70px;
    margin: 3px;
    height: 40px;
  }
`;
const IconDiv = styled.div`
  width: 100px;
  margin: 3px;
  height: 50px;
`;

const ColDiv = styled.div`
  width: 100px;
  margin: 3px;
  height: 50px;
  @media only screen and (max-width: 991px) {
    width: 70px;
    margin: 3px;
    height: 40px;
  }
`;
const FieldContainer = styled.div`
  display: flex;
`;
const renderItem = ({
  type,
  choicesType,
  dynamic = false,
  id,
  name,
  choices = [],
  updatedSessions = [],
  ...props
}) => {
  let newChoices = [];
  if (type === 'SelectorWithInput' || type === 'Selector') {
    if (dynamic) {
      newChoices = choices.map(c => {
        return { name: c, id: c };
      });
    } else {
      newChoices = updatedSessions;
    }
  }
  switch (type) {
    case NUMBER_FIELD_TYPE:
      return <CRNumberInput label={name} name={id} {...props} />;
    case TEXT_FIELD_TYPE:
      return <CRTextInput label={name} name={id} {...props} />;
    case LONG_TEXT_FIELD_TYPE:
      return <CRTextArea label={name} name={id} {...props} importable />;
    case RADIO_FIELD_TYPE:
      return <CRRadio label={name} name={id} options={choices} {...props} />;
    case SELECTOR:
      return (
        <CRSelectInput
          label={name}
          name={id}
          data={newChoices}
          style={{ width: '130px', margin: '0px 2px' }}
          {...props}
        />
      );
    case SELECTOR_WITH_INPUT:
      return (
        <CRMultipleSelector
          label={name}
          name={id}
          choices={newChoices}
          {...props}
        />
      );

    // case CHECK_FIELD_TYPE:
    //   return (
    //     <CRCheckBoxGroup
    //       label={name}
    //       options={choices}
    //       name={id}
    //       {...props}
    //       inline
    //     />
    //   );
    case NESTED_SELECTOR_FIELD_TYPE:
      return (
        <CRNestedSelector label={name} name={id} choices={choices} {...props} />
      );
    default:
      return null;
  }
};

const GroupContainer = ({
  fields,
  formValue,
  onChange,
  updatedSessions,
  title,
}) => {
  const [formValueTwo, setFormValueTwo] = useState();

  const handleOnChange = useCallback(() => {
    let newFormVal = { ...formValue };
    fields.forEach(f => {
      let val = [];
      val =
        formValue[f.id].constructor === Array
          ? [formValueTwo[f.id], ...formValue[f.id]]
          : [formValueTwo[f.id]];
      newFormVal[f.id] = val;
    });
    onChange(newFormVal);
  }, [formValueTwo, setFormValueTwo, onChange]);

  const handleDelete = useCallback(
    indx => {
      let newFormVal = { ...formValue };
      fields.forEach(f => {
        let val = [];
        val =
          formValue[f.id].constructor === Array
            ? newFormVal[f.id].filter((v, index) => index != indx)
            : [formValueTwo[f.id]];
        newFormVal[f.id] = val;
      });
      onChange(newFormVal);
    },
    [onChange, formValue]
  );

  return (
    <>
      <H3 mb={10}>{title}</H3>
      <Div display="flex">
        <Form formValue={formValueTwo} onChange={setFormValueTwo}>
          <FieldContainer display="flex">
            {fields?.map(f => (
              <Div mb={4} key={f.id}>
                {renderItem({
                  ...f,
                  updatedSessions,
                })}
              </Div>
            ))}
            <CRButton
              onClick={() => handleOnChange()}
              // disabled={disabled}
              mt={41}
              ml={20}
            >
              Add
            </CRButton>
          </FieldContainer>
        </Form>
      </Div>
      <Div mt={10}>
        {fields.length > 0 && (
          <>
            <Div display="flex">
              {fields?.map(({ name }, indx) => (
                <ColDiv>{name}</ColDiv>
              ))}
            </Div>
            <Div display="flex">
              <Div display="flex">
                {fields?.map(({ id }, indx) => (
                  <Div>
                    {formValue[id] &&
                      formValue[id]?.map((v, indx) => <CellDiv>{v}</CellDiv>)}
                  </Div>
                ))}
              </Div>
              <Div>
                {formValue[fields[0].id] &&
                  formValue[fields[0].id]?.map((v, indx) => (
                    <IconDiv>
                      <IconButton
                        icon={<Icon icon="trash" />}
                        color="red"
                        onClick={() => handleDelete(indx)}
                      />
                    </IconDiv>
                  ))}
              </Div>
            </Div>
          </>
        )}
      </Div>
    </>
  );
};

export default GroupContainer;
