import React, { memo, useEffect, useState } from 'react';
import { CRTextInput, CRSelectInput, Div, CRButton } from 'components';
import {
  ChoiceContainerStyled,
  ChoiceName,
  ButtonDiv,
  Container,
} from './style';
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
    const newValue = value.filter((v, index) => index != indx);
    onChange(newValue);
  };

  return (
    <Div>
      <Form formValue={formValue} onChange={setFormValue}>
        <Div display="flex">
          <CRSelectInput
            name="choice"
            data={choices}
            style={{ width: '200px', marginRight: '30px' }}
            disabled={disabled}
          />
          <CRTextInput name="text" disabled={disabled} />

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
        {value.length > 0 &&
          value?.map(
            ([choice, text], indx) =>
              choice && (
                <ChoiceContainerStyled>
                  <Container>
                    <ChoiceName>{choice}</ChoiceName>
                    <ChoiceName ml="20px">{text}</ChoiceName>
                    <ButtonDiv>
                      <CRButton
                        variant="dark"
                        width={150}
                        m="auto"
                        onClick={() => handleDelete(indx)}
                        disabled={disabled}
                      >
                        Delete
                      </CRButton>
                    </ButtonDiv>
                  </Container>
                </ChoiceContainerStyled>
              )
          )}
      </Div>
    </Div>
  );
};

export default memo(MultipleSelector);
