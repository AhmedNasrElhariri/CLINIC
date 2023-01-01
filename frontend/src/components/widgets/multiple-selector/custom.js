import React, { memo, useState } from 'react';
import {
  CRTextInput,
  CRSelectInput,
  Div,
  CRButton,
  CRDivider,
  CRVDivider,
} from 'components';
import { ChoiceContainerStyled, Container } from './style';
import { Form } from 'rsuite';

const initialValue = {
  choice: '',
  text: '',
};
const MultipleSelector = ({ choices, onChange, value, disabled, ...props }) => {
  const [formValue, setFormValue] = useState(initialValue);

  const handleOnChange = () => {
    const { choice, text } = formValue;
    const choicedValue = [choice, text];
    const newValue = [...value, choicedValue];
    onChange(newValue);
    setFormValue(initialValue);
  };

  const handleDelete = indx => {
    const newValue = value.filter((v, index) => index !== indx);
    onChange(newValue);
  };

  return (
    <Div width={600}>
      <Form formValue={formValue} onChange={setFormValue}>
        <Div display="flex" justifyContent="space-between">
          <CRSelectInput
            name="choice"
            data={choices}
            style={{ width: '200px', marginRight: '20px' }}
            disabled={disabled}
          />
          <Div flexGrow={1}>
            <CRTextInput name="text" disabled={disabled} />
          </Div>

          <CRButton
            onClick={() => handleOnChange()}
            disabled={disabled}
            mt={10}
            ml={20}
          >
            Add
          </CRButton>
        </Div>
      </Form>
      <Div mt={10}>
        {(value || []).map(
          ([choice, text], indx) =>
            choice && (
              <ChoiceContainerStyled>
                <Container>
                  <Div display="flex" flexGrow={1} p="10px">
                    <Div>{choice}</Div>
                    <CRVDivider />
                    <Div>{text}</Div>
                  </Div>
                  <Div display="flex" alignItems="center" mr="4px">
                    <CRButton
                      variant="danger"
                      display="block"
                      onClick={() => handleDelete(indx)}
                      disabled={disabled}
                      verysmall
                    >
                      Delete
                    </CRButton>
                  </Div>
                </Container>
              </ChoiceContainerStyled>
            )
        )}
      </Div>
    </Div>
  );
};

export default memo(MultipleSelector);
